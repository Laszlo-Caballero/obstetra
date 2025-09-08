export class Console {
  static log(...args: unknown[]): void {
    console.log("==============================================");
    console.log("[LOG]:", ...args);
    console.log("==============================================");
  }
}
