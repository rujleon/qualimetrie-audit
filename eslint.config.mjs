import js from "@eslint/js";
import globals from "globals";

export default [
  // Ignorations globales (très important de le mettre en premier)
  {
    ignores: [
      "coverage/**",
      "dist/**",
      "build/**",
      "node_modules/**",
      "*.config.js",     // optionnel
      "lcov-report/**"
    ]
  },

  js.configs.recommended,

  // Globals pour tout le projet
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  // Configuration spécifique pour jest.config.js (au cas où)
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