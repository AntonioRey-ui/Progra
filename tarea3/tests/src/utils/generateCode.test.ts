import { describe, it, expect } from "vitest";
import { generateSixDigitCode } from "../../../src/utils/generateCode.util.ts";

describe("generate code test", () => {
  it("should generate a code with 6 digits", () => {
    expect(generateSixDigitCode()).toMatch(/^\d{6}$/);
  });

  it("should generate positive integers", () => {
    const code = Number(generateSixDigitCode());
    expect(Number.isInteger(code)).toBe(true);
    expect(code).toBeGreaterThanOrEqual(100000);
    expect(code).toBeLessThanOrEqual(999999);
  });

  it("should generate unique codes", () => {
    const code1 = generateSixDigitCode();
    const code2 = generateSixDigitCode();
    expect(code1 !== code2).toBe(true);
  });
});
