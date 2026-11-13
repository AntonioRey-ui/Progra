import { describe, it, expect, beforeAll } from "vitest";
import { hashPassword, comparePassword } from "../../../src/utils/password.util.ts";

describe("password.util", () => {
  const password1 = "ClaveUno123!";
  const password2 = "ClaveDos456!";

  let hash1: string;
  let hash2: string;

  beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
  });

  it("Generación de hashes: hash1 y hash2 son cadenas no vacías y diferentes de su contraseña original", () => {
    expect(hash1).toBeDefined();
    expect(typeof hash1).toBe("string");
    expect(hash1.length).toBeGreaterThan(0);
    expect(hash1).not.toBe(password1);

    expect(hash2).toBeDefined();
    expect(typeof hash2).toBe("string");
    expect(hash2.length).toBeGreaterThan(0);
    expect(hash2).not.toBe(password2);
  });

  it("Contraseña correcta: comparePassword(password1, hash1) y comparePassword(password2, hash2) devuelven true", async () => {
    const isPassword1Valid = await comparePassword(password1, hash1);
    const isPassword2Valid = await comparePassword(password2, hash2);

    expect(isPassword1Valid).toBe(true);
    expect(isPassword2Valid).toBe(true);
  });

  it("Contraseña incorrecta: comparePassword(password2, hash1) y comparePassword(password1, hash2) devuelven false", async () => {
    const isPassword2WithHash1Valid = await comparePassword(password2, hash1);
    const isPassword1WithHash2Valid = await comparePassword(password1, hash2);

    expect(isPassword2WithHash1Valid).toBe(false);
    expect(isPassword1WithHash2Valid).toBe(false);
  });
});
