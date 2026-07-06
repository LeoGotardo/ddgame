# D&D Adventure Clicker

A D&D-themed incremental/clicker game built with React. Roll the dice, earn gold, and spend it on upgrades to boost your click power and passive income.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for dev server and bundling
- **Express** for serving the production build
- **Tailwind CSS v4** + **Radix UI** primitives (via shadcn-style components)
- **Framer Motion** for animations
- **Wouter** for client-side routing
- **pnpm** as the package manager

## Project Structure

```
client/       React frontend (game UI, components, hooks, contexts)
server/       Express server that serves the built frontend
shared/       Code shared between client and server
patches/      pnpm patches for third-party packages
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

The app will be available at the printed local URL.

## Scripts

| Script          | Description                                      |
| --------------- | ------------------------------------------------- |
| `pnpm dev`      | Start the Vite dev server                         |
| `pnpm build`    | Build the client and bundle the server for prod   |
| `pnpm start`    | Run the production server (`dist/index.js`)        |
| `pnpm preview`  | Preview the production client build                |
| `pnpm check`    | Type-check the project with `tsc --noEmit`         |
| `pnpm format`   | Format the codebase with Prettier                  |

## Deployment

The project includes a `vercel.json` configured to build with Vite and output to `dist/public`, so it can be deployed directly on Vercel.

## Gameplay

- Click the dice to roll and earn gold, with a chance of critical bonuses.
- Spend gold in the shop on upgrades that increase click power and passive income.
- Unlock achievements as you progress.
- Game progress is saved locally (autosave) and settings (particles, sounds, click effects, notifications) are configurable.
