# CONTROL

CONTROL is a visual-first mobile fitness portfolio project built with React Native, Expo, and TypeScript. The product concept is an adaptive command center for hybrid training, with local workout flows, rich data visualization, and deterministic “smart” adaptations.

This repository is intentionally **mock-only**:

- no backend or database;
- no real authentication;
- no remote AI or LLM;
- no paid services;
- no runtime dependency on remote images.

## Current status

Product discovery and implementation planning are complete. The repository still contains the original Expo starter UI; implementation target **v0.1.0 — Functional Shell** has not started yet.

The current starter is on Expo SDK 57, React Native 0.86, React 19.2, and TypeScript strict mode. A known baseline typecheck issue involving the starter's CSS imports is documented for repair in the first implementation session.

## Documentation

- [Product vision](docs/PRODUCT_VISION.md)
- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Design system](docs/DESIGN_SYSTEM.md)
- [Asset brief and image prompts](docs/ASSET_BRIEF.md)
- [Quality and release gates](docs/QUALITY.md)

Repository rules for coding agents live in [AGENTS.md](AGENTS.md).

## Requirements

- Node.js 22.13 or newer. The current workspace has Node.js 24 available.
- npm.
- Expo Go on the Android or iPhone used for testing.
- Android Studio only if an Android emulator is desired.
- macOS and Xcode only if an iOS Simulator is desired.

Expo's iOS Simulator runs only on macOS. From Windows, use a physical iPhone with Expo Go.

## Install

```bash
npm install
```

## Start

```bash
npx expo start
```

The terminal displays a QR code.

### Android device

1. Install Expo Go from Google Play.
2. Keep the phone and computer on the same network.
3. Scan the QR code from Expo Go.

### Android emulator

1. Start an emulator from Android Studio.
2. Start the Expo development server.
3. Press `a` in the Expo terminal.

### Physical iPhone from Windows

1. Install Expo Go from the App Store.
2. Keep the iPhone and computer on the same network.
3. Scan the QR code with the iPhone camera and open it in Expo Go.

If the device cannot reach the development server over the local network, try:

```bash
npx expo start --tunnel
```

For a stale Metro cache:

```bash
npx expo start --clear
```

## Current scripts

```bash
npm run start
npm run android
npm run ios
npm run web
npm run lint
```

The v0.1 implementation will add `typecheck`, `test`, and `test:ci` scripts before the first version is closed.

## Planned local demo behavior

v0.1 will provide a local demo profile, registration, onboarding, logout, theme preference, and a minimal workout session. AsyncStorage will persist display data and session state only; passwords will never be stored.

Later versions will add Today, Live Workout, Smart Adaptation, Progress, and Control Twin as local features. Smart Adaptation will use transparent deterministic rules and will not claim to be a real AI system.

## Official Expo references

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [Start developing](https://docs.expo.dev/get-started/start-developing/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Router tabs](https://docs.expo.dev/router/advanced/tabs/)
