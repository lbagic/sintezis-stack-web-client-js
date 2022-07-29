export {}

declare global {
  interface String {
    /**
     * Converts first letter of each word to capital letter.
     */
    capitalize(): string;
    /**
     * Converts string to snake_case.
     */
    toSnakeCase() : string;
    /**
     * Converts string to kebab-case.
     */
    toKebabCase() : string;
    /**
     * Converts string to camelCase.
     */
    toCamelCase() : string;
    /**
     * Converts string to PascalCase.
     */
    toPascalCase() : string;
  }
}