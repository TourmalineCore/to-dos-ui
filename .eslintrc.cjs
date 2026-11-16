module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "cypress/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:cypress/recommended",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    // disables "Unused eslint-disable directive (no problems were reported)" for auto-generated api-types/index.ts
    "api-types",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      tsx: true,
    },
  },
  plugins: ["react-refresh", "import"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["node_modules", "src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "no-console": "error",
    "react-refresh/only-export-components": [
      "warn",
      {
        allowConstantExport: true,
      },
    ],
    "import/no-default-export": 2,
    "react-hooks/exhaustive-deps": 0,
  },
};
