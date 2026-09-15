# CONTROL — project instructions

## Mission

CONTROL is a mobile portfolio showcase built with React Native and Expo. Its value is in product thinking, visual quality, motion, interaction design, and a coherent set of local features.

The product is permanently **mock-only, offline-first, and zero-cost**.

## Hard constraints

- Never add a backend, database, remote API, authentication provider, analytics service, paid service, or LLM integration.
- Never create repositories, adapters, DTOs, API clients, environment variables, or dependency-injection layers in preparation for a future backend. That future does not exist for this project.
- Never present a deterministic feature as real AI. Smart Adaptation must be described as a local, simulated product concept.
- Never load product images from remote URLs at runtime. Bundle all approved assets locally.
- Never store passwords. Authentication is a transparent local demo flow, not security.
- Product UI and portfolio screenshots use English. Project documentation uses Brazilian Portuguese.
- Android and a physical iPhone through Expo Go are the primary validation targets. Web only needs to remain buildable unless a later plan expands its scope.

## Sources of truth

Read the relevant documents before making changes:

1. `docs/PRODUCT_VISION.md` — product intent and scope.
2. `docs/IMPLEMENTATION_PLAN.md` — current version and work order.
3. `docs/ARCHITECTURE.md` — routes, local state, data, and boundaries.
4. `docs/DESIGN_SYSTEM.md` — visual and interaction rules.
5. `docs/ASSET_BRIEF.md` — image generation, stock assets, and provenance.
6. `docs/QUALITY.md` — tests, manual QA, and definition of done.

If documents disagree, the most specific document wins. A direct user instruction always wins over repository documentation.

## Expo version discipline

Expo has changed. Before writing Expo or React Native code, read the exact versioned documentation at <https://docs.expo.dev/versions/v57.0.0/> and the SDK 57 page for every package being introduced.

- Expo SDK: 57
- React Native: 0.86
- React: 19.2
- TypeScript strict mode: required
- Install compatible native packages with `npx expo install`, not an arbitrary version from memory.
- Prefer stable Expo Router APIs for essential navigation. CONTROL uses JavaScript tabs with a custom tab bar; it must not depend on experimental native tabs.

## Implementation workflow

- Work on only one planned version at a time. The active target is v0.1.0 until its closure checklist passes.
- Within a version, implement vertical, runnable slices. Do not leave the app unable to launch at the end of a working session.
- Inspect the current tree and git diff before editing. Preserve unrelated user changes.
- Keep `src/app` limited to routes and layouts. Put feature code outside the route tree.
- Import local fixtures directly. Use pure local functions for derived data and simulated adaptation.
- Keep transient state close to its feature. Put only cross-route or persisted demo state in the shared Zustand store.
- Style through semantic tokens and design-system primitives. Do not introduce magic colors or duplicate spacing values inside feature screens.
- Use Reanimated for meaningful motion and respect reduced-motion preferences.
- Every primary pressable must respond visually, semantically, and—where appropriate—with haptics.
- Update the applicable document when a structural or product decision changes.

## Git workflow

- Never implement work directly on `main`.
- Start every task from an updated `main`, then create a dedicated branch before editing.
- Use `feature/<short-name>` for product work, `bugfix/<short-name>` for fixes, and `docs/<short-name>` for documentation-only work.
- Keep one task per branch and use lowercase, hyphenated English branch names.
- When a commit is explicitly requested, follow Conventional Commits (`feat`, `fix`, `docs`, `test`, `refactor`, `style`, `perf`, `build`, `ci`, `chore`, or `revert`).
- Do not create commits, tags, releases, pushes, or pull requests unless the user explicitly asks for that action.
- Run the applicable quality gates and review the diff before proposing integration into `main`.

## Dependency policy

- Keep dependencies intentional and small.
- Approved for v0.1 planning: AsyncStorage, Zustand, Expo Haptics, Expo LinearGradient, React Native SVG, Lucide React Native, Jest Expo, and React Native Testing Library.
- Do not add Skia, a chart library, form library, server-state library, external bottom-sheet library, or UI framework in v0.1.
- Before adding any package, state the concrete need it solves and confirm Expo 57 compatibility.

## Asset policy

- Generated hero images and free stock images must follow `docs/ASSET_BRIEF.md`.
- Record source, author, license URL and retrieval date for stock assets.
- Record the prompt and generation method for generated assets.
- Keep icons, logo, charts, backgrounds, and the future body map vector or procedural whenever practical.
- Do not commit unoptimized originals when a delivery-sized derivative is sufficient.

## Quality gates

The following gates must pass before closing a version:

```bash
npm run lint
npm run typecheck
npm run test:ci
```

Also run the planned Expo export check and perform the manual Android/iPhone smoke tests defined in `docs/QUALITY.md`.

Do not claim a gate passed if its script has not been created yet or the command was not run. The current starter baseline has known TypeScript CSS declaration errors; v0.1 Session 1 owns that repair.

## Definition of done

A change is done only when:

- the app launches without a red screen;
- relevant interactions are reachable and have no dead primary actions;
- light and dark themes both remain legible;
- loading, empty, error, and reset behavior are handled where applicable;
- lint, typecheck, and relevant tests pass;
- Android and iPhone behavior has been checked in proportion to the change;
- the implementation remains fully local and honest about simulation;
- documentation matches the resulting behavior.
