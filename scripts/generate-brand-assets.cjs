const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const OUTPUT_DIRECTORY = path.join(__dirname, '..', 'assets', 'images');
const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function createCrcTable() {
  return Array.from({ length: 256 }, (_, value) => {
    let crc = value;

    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 1) !== 0 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }

    return crc >>> 0;
  });
}

const CRC_TABLE = createCrcTable();

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data = Buffer.alloc(0)) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function pointToSegmentDistance(x, y, start, end) {
  const segmentX = end.x - start.x;
  const segmentY = end.y - start.y;
  const lengthSquared = segmentX * segmentX + segmentY * segmentY;
  const projection = Math.max(
    0,
    Math.min(1, ((x - start.x) * segmentX + (y - start.y) * segmentY) / lengthSquared),
  );
  const projectedX = start.x + projection * segmentX;
  const projectedY = start.y + projection * segmentY;

  return Math.hypot(x - projectedX, y - projectedY);
}

function smoothCoverage(distance, radius, feather = 2) {
  return Math.max(0, Math.min(1, (radius + feather - distance) / (feather * 2)));
}

function symbolCoverage(x, y, size) {
  const scale = size / 1024;
  const center = size / 2;
  const distance = Math.hypot(x - center, y - center);
  const angle = Math.atan2(y - center, x - center);
  const outerRadius = 294 * scale;
  const innerRadius = 198 * scale;
  const ring = Math.min(
    smoothCoverage(distance, outerRadius, 2 * scale),
    smoothCoverage(innerRadius, distance, 2 * scale),
  );
  const openRing = Math.abs(angle) < 0.68 ? 0 : ring;
  const points = [
    { x: 500, y: 512 },
    { x: 596, y: 512 },
    { x: 638, y: 446 },
    { x: 700, y: 584 },
    { x: 744, y: 512 },
    { x: 850, y: 512 },
  ].map((point) => ({ x: point.x * scale, y: point.y * scale }));
  const pulseDistance = points
    .slice(0, -1)
    .reduce(
      (closest, point, index) =>
        Math.min(closest, pointToSegmentDistance(x, y, point, points[index + 1])),
      Number.POSITIVE_INFINITY,
    );
  const pulse = smoothCoverage(pulseDistance, 22 * scale, 2 * scale);

  return Math.max(openRing, pulse);
}

function renderPng(size, foreground, background) {
  const stride = size * 4 + 1;
  const raw = Buffer.alloc(stride * size);

  for (let y = 0; y < size; y += 1) {
    const rowOffset = y * stride;
    raw[rowOffset] = 0;

    for (let x = 0; x < size; x += 1) {
      const offset = rowOffset + 1 + x * 4;
      const coverage = symbolCoverage(x + 0.5, y + 0.5, size);

      if (background) {
        raw[offset] = Math.round(background[0] + (foreground[0] - background[0]) * coverage);
        raw[offset + 1] = Math.round(background[1] + (foreground[1] - background[1]) * coverage);
        raw[offset + 2] = Math.round(background[2] + (foreground[2] - background[2]) * coverage);
        raw[offset + 3] = 255;
      } else {
        raw[offset] = foreground[0];
        raw[offset + 1] = foreground[1];
        raw[offset + 2] = foreground[2];
        raw[offset + 3] = Math.round(coverage * 255);
      }
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;

  return Buffer.concat([
    PNG_SIGNATURE,
    chunk('IHDR', header),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND'),
  ]);
}

function writeAsset(filename, size, foreground, background) {
  fs.writeFileSync(path.join(OUTPUT_DIRECTORY, filename), renderPng(size, foreground, background));
}

fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });

const volt = [200, 255, 61];
const graphite = [8, 10, 9];

writeAsset('icon.png', 1024, volt, graphite);
writeAsset('favicon.png', 512, volt, graphite);
writeAsset('splash-icon.png', 1024, volt);
writeAsset('android-icon-foreground.png', 1024, volt);
writeAsset('android-icon-monochrome.png', 1024, [255, 255, 255]);
