export {}

declare global {
  interface String {
    /**
     * Converts string to "helloWorld".
     */
    toCamelCase(): string;
    /**
     * Converts string to "Hello World".
     */
    toCapitalCase(): string;
    /**
     * Converts string to "HELLO_WORLD".
     */
    toConstantCase(): string;
    /**
     * Converts string to "hello.world".
     */
    toDotCase(): string;
    /**
     * Converts string to "Hello-World".
     */
    toHeaderCase(): string;
    /**
     * Converts string to "hello world".
     */
    toNoCase(): string;
    /**
     * Converts string to "hello-world".
     */
    toParamCase(): string;
    /**
     * Converts string to "HelloWorld".
     */
    toPascalCase(): string;
    /**
     * Converts string to "hello/world".
     */
    toPathCase(): string;
    /**
     * Converts string to "Hello world".
     */
    toSentenceCase(): string;
    /**
     * Converts string to "hello_world".
     */
    toSnakeCase(): string;
   }
}
