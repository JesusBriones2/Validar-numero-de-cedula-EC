# Proceso de Validación de Cédula y RUC en Ecuador

## Validación de Números de Cédula

Dado como ejemplo el siguiente número de cédula: `1245322719`

1. **Formato y Estructura**:

   - El número debe tener 10 dígitos.
   - El último dígito es el dígito verificador (en este caso, 9).
   - Los dos primeros dígitos indican la provincia donde se emitió el documento, con valores entre 0 y 24.
   - Coeficientes: 2, 1, 2, 1, 2, 1, 2, 1, 2.

2. **Cálculo de Multiplicaciones**:
   Multiplicar cada dígito (excepto el verificador) por su correspondiente coeficiente.

   | Posición | Dígito | Coeficiente | Multiplicación |
   | -------- | ------ | ----------- | -------------- |
   | 0        | 1      | 2           | 2              |
   | 1        | 2      | 1           | 2              |
   | 2        | 4      | 2           | 8              |
   | 3        | 5      | 1           | 5              |
   | 4        | 3      | 2           | 6              |
   | 5        | 2      | 1           | 2              |
   | 6        | 2      | 2           | 4              |
   | 7        | 7      | 1           | 7              |
   | 8        | 1      | 2           | 2              |

3. **Ajuste de Resultados**:
   Si el resultado de una multiplicación es 10 o mayor, restar 9.

   | Resultado Original | Ajuste | Resultado Final |
   | ------------------ | ------ | --------------- |
   | 2                  | -      | 2               |
   | 2                  | -      | 2               |
   | 8                  | -9     | -1              |
   | 5                  | -      | 5               |
   | 6                  | -9     | -3              |
   | 2                  | -      | 2               |
   | 4                  | -      | 4               |
   | 7                  | -      | 7               |
   | 2                  | -      | 2               |

4. **Sumatoria y Módulo 10**:

   - Sumar los resultados ajustados: `2 + 2 + -1 + 5 + -3 + 2 + 4 + 7 + 2 = 18`
   - Aplicar módulo 10 al total: `18 % 10 = 8`

5. **Comparación Final**:
   - Si el resultado es 0, compararlo con el dígito verificador.
   - Si no, restar el resultado de 10 y comparar: `10 - 8 = 2`

En este caso, `2` no coincide con el dígito verificador `9`, por lo que la cédula es inválida.

## Validación de Números de RUC

### RUC Natural

Para el RUC: `1713175071001`

1. **Formato y Estructura**:

   - Debe tener 13 dígitos.
   - Los dos primeros dígitos indican la provincia (entre 01 y 24).
   - Los últimos tres dígitos son el número de establecimiento (generalmente `001`).

2. **Cálculo**:
   - Validar los primeros 10 dígitos como una cédula (`1713175071`).

### RUC Jurídico y Extranjeros

Para el RUC: `1790085783001`

1. **Formato y Estructura**:

   - Debe tener 13 dígitos.
   - El tercer dígito debe ser `9`.
   - El dígito verificador es el décimo (en este caso, 3).
   - Coeficientes: 4, 3, 2, 7, 6, 5, 4, 3, 2.

2. **Cálculo de Multiplicaciones**:
   Multiplicar cada dígito (excepto el verificador y los tres últimos) por su correspondiente coeficiente.

   | Posición | Dígito | Coeficiente | Multiplicación |
   | -------- | ------ | ----------- | -------------- |
   | 0        | 1      | 4           | 4              |
   | 1        | 7      | 3           | 21             |
   | 2        | 9      | 2           | 18             |
   | 3        | 0      | 7           | 0              |
   | 4        | 0      | 6           | 0              |
   | 5        | 8      | 5           | 40             |
   | 6        | 5      | 4           | 20             |
   | 7        | 7      | 3           | 21             |
   | 8        | 8      | 2           | 16             |

3. **Sumatoria y Módulo 11**:

   - Sumar los resultados: `4 + 21 + 18 + 0 + 0 + 40 + 20 + 21 + 16 = 140`
   - Aplicar módulo 11 al total: `140 % 11 = 8`

4. **Comparación Final**:
   - Restar el resultado de 11 y comparar: `11 - 8 = 3`
   - Comparar con el dígito verificador (3), coinciden.

El RUC es válido.

### RUC Público

Para el RUC: `1260004800001`

1. **Formato y Estructura**:

   - Debe tener 13 dígitos.
   - El tercer dígito debe ser `6`.
   - El dígito verificador es el noveno (en este caso, 0).
   - Coeficientes: 3, 2, 7, 6, 5, 4, 3, 2.

2. **Cálculo de Multiplicaciones**:
   Multiplicar cada dígito (excepto el verificador y los cuatro últimos) por su correspondiente coeficiente.

   | Posición | Dígito | Coeficiente | Multiplicación |
   | -------- | ------ | ----------- | -------------- |
   | 0        | 1      | 3           | 3              |
   | 1        | 2      | 2           | 4              |
   | 2        | 6      | 7           | 42             |
   | 3        | 0      | 6           | 0              |
   | 4        | 0      | 5           | 0              |
   | 5        | 0      | 4           | 0              |
   | 6        | 4      | 3           | 12             |
   | 7        | 8      | 2           | 16             |

3. **Sumatoria y Módulo 11**:

   - Sumar los resultados: `3 + 4 + 42 + 0 + 0 + 0 + 12 + 16 = 77`
   - Aplicar módulo 11 al total: `77 % 11 = 0`

4. **Comparación Final**:
   - Comparar el resultado con el dígito verificador, coinciden.

El RUC es válido.
