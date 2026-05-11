import js from "@eslint/js";
import globals from "globals";

export default [
  // 1. Ignorer les dossiers inutiles
  {
    ignores: ["coverage/**", "dist/**", "build/**", "node_modules/**"]
  },

  // 2. Configuration de base ESLint
  js.configs.recommended,

  // 3. Variables globales pour tout le projet (Node.js)
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // 4. Variables globales Jest pour les fichiers de test
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // 5. Configuration spécifique pour jest.config.js
  {
    files: ["jest.config.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        module: "writable",
      },
    },
  },
];