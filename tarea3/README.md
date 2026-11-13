# Tarea 3: Pruebas Unitarias de Utilitarios

Pruebas unitarias con **Vitest y TypeScript** para los utilitarios de backend (`password.util.ts` y `generateCode.util.ts`).

## Estructura del Proyecto

```text
tarea3/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── src/
│   └── utils/
│       ├── password.util.ts
│       └── generateCode.util.ts
└── tests/
    └── src/
        └── utils/
            ├── password.test.ts
            └── generateCode.test.ts
```

## Casos de prueba implementados

### `password.test.ts`
1. **Generación de hashes**: Valida que `hash1` y `hash2` son cadenas no vacías y diferentes de las contraseñas en texto plano (`password1` y `password2`).
2. **Contraseña correcta**: Verifica que `comparePassword(password1, hash1)` y `comparePassword(password2, hash2)` retornen `true`.
3. **Contraseña incorrecta**: Verifica que `comparePassword(password2, hash1)` y `comparePassword(password1, hash2)` retornen `false`.

### `generateCode.test.ts`
1. Código de 6 dígitos numéricos.
2. Enteros positivos dentro del rango esperado (100000 - 999999).
3. Generación de códigos únicos.

## Ejecución de pruebas

```bash
npm test -- tests/src/utils/password.test.ts tests/src/utils/generateCode.test.ts
```

## Salida de Terminal

```text
> tarea3@1.0.0 test
> vitest run tests/src/utils/password.test.ts tests/src/utils/generateCode.test.ts

 RUN  v3.2.7 /Users/antoniovillasenor/Desktop/UNI/TareasProgra/tarea3

 ✓ tests/src/utils/generateCode.test.ts (3 tests) 2ms
 ✓ tests/src/utils/password.test.ts (3 tests) 1265ms
   ✓ password.util > Generación de hashes: hash1 y hash2 son cadenas no vacías y diferentes de su contraseña original
   ✓ password.util > Contraseña correcta: comparePassword(password1, hash1) y comparePassword(password2, hash2) devuelven true
   ✓ password.util > Contraseña incorrecta: comparePassword(password2, hash1) y comparePassword(password1, hash2) devuelven false

 Test Files  2 passed (2)
      Tests  6 passed (6)
   Duration  1.73s
```
