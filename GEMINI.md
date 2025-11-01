# Project Overview

This is a Vue 3 project bootstrapped with Vite, utilizing TypeScript for type safety and UnoCSS for utility-first styling. It serves as a development environment for creating and testing various API demonstrations and component patterns.

The project is configured with modern tooling to enhance the development experience:
- **Vite:** Fast build tool and dev server.
- **Vue 3:** Using the Composition API with `<script setup>`.
- **TypeScript:** For static typing.
- **UnoCSS:** A utility-first CSS framework.
- **Pinia:** For state management.
- **unplugin-vue-router:** File-system based routing.
- **unplugin-auto-import:** Automatic imports for Composition API and other utilities.
- **unplugin-vue-components:** Automatic importing of Vue components.
- **ESLint:** For code linting and style checking.
- **Commitlint:** To enforce conventional commit messages.

The structure suggests a focus on modularity, with clear separation between pages, components, and stores. Both standard Single File Components (`.vue`) and TSX (`.tsx`) are used for component creation.

# Building and Running

The project uses `pnpm` as the package manager.

- **Install dependencies:**
  ```bash
  pnpm install
  ```

- **Run the development server:**
  ```bash
  pnpm dev
  ```
  The server will be accessible at `http://localhost:5150`.

- **Build for production:**
  ```bash
  pnpm build
  ```

- **Lint the code:**
  ```bash
  pnpm lint
  ```

- **Fix linting errors:**
  ```bash
  pnpm lint:fix
  ```

# Development Conventions

- **Styling:** Use UnoCSS utility classes directly in the template for styling.
- **Routing:** Pages are created as `.vue` files within the `src/pages` directory. The routing is handled automatically by `unplugin-vue-router`.
- **Components:** Reusable components are located in `src/components`. They are automatically imported into pages and other components as needed. Both `.vue` and `.tsx` files are used.
- **State Management:** Global state is managed using Pinia. Stores are defined in the `src/stores` directory.
- **Commits:** Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. A helper command `pnpm commit` is available to guide the commit process.
- **Code Style:** Code style is enforced by ESLint using a configuration based on `@antfu/eslint-config`.
