import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    rules: {
      "valid-jsdoc": 0,
      "linebreak-style": 0,
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "always"],
      "max-len": [
        "error",
        {
          code: 1000,
        },
      ],
      "spaced-comment": 0,
      "no-multi-spaces": 0,
      "require-jsdoc": 0,
      "new-cap": 0,
      "no-multiple-empty-lines": 0,
      "no-unsafe-finally": "off",
      "no-console": 0,
      "no-mixed-spaces-and-tabs": 0,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      semi: 0,
      "no-unused-vars": 0,
      "no-undef": 0,
      "no-undef-init": 0,
      "no-unused-expressions": 0,
      "no-unused-labels": 0,
      quotes: ["error", "single"],
    },
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended",
  ),
  {
    files: ["src/**/**/*.ts", "src/**/**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];

export default eslintConfig;
