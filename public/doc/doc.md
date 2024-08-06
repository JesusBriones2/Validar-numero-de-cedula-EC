# Proceso de validación de cédula y RUC en Ecuador

## Validación de número de cédula

Cédula de ejemplo: `1709839664`

1. **Formato y Estructura**:

   - El número debe tener 10 dígitos.
   - Los dos primeros dígitos indican la provincia donde se emitió el documento, con valores entre 01 y 24.
   - Los siguientes 7 dígitos son números consecutivos.
   - El último dígito es el dígito verificador.
   - Coeficientes: `2, 1, 2, 1, 2, 1, 2, 1, 2`.

2. **Multiplicación de coeficientes y Ajuste de Resultados**:<br>

   - Multiplicar cada dígito (excepto el dígito verificador) por su correspondiente coeficiente.
   - Si el resultado de una multiplicación es 10 o mayor, restar 9.

   | Díg | Coef | Mult | Ajus | Res |
   | --- | ---- | ---- | ---- | --- |
   | 1   | 2    | 2    | -    | 2   |
   | 7   | 1    | 7    | -    | 7   |
   | 0   | 2    | 0    | -    | 0   |
   | 9   | 1    | 9    | -    | 9   |
   | 8   | 2    | 16   | -9   | 7   |
   | 3   | 1    | 3    | -    | 3   |
   | 9   | 2    | 18   | -9   | 9   |
   | 6   | 1    | 6    | -    | 6   |
   | 6   | 2    | 12   | -9   | 3   |

3. **Sumatoria y calculo de módulo 10**:

   - Sumar los resultados ajustados: `2 + 7 + 0 + 9 + 7 + 3 + 9 + 6 + 3 = 46`
   - Aplicar módulo 10 al total: `46 % 10 = 6`

4. **Comparación Final**:

   - Si el resultado es 0, compáralo directamente con el dígito verificador.
   - Si no, resta el resultado de 10 y compáralo: `10 - 6 = 4`
   - Si el resultado final es 10, el dígito verificador es 0.

   En este caso, el resultado es `4` y coincide con el dígito verificador, que es `4`. Por lo tanto, la cédula `1709839664` es válida.

## Validación de Números de RUC (Registro Único de Contribuyentes)

### RUC Natural

#### RUC de ejemplo: `1801798990001`

1. **Formato y Estructura**:

   - Debe tener 13 dígitos.
   - Los primeros 10 dígitos (`1801798990`) corresponden al número de cédula.
   - Los últimos 3 dígitos (`001`) representan el establecimiento.

2. **Cálculo**:
   - Valida los primeros 10 dígitos con el mismo proceso de validación de cédula ecuatoriana.

### RUC jurídico y extranjeros sin cédula

#### RUC de ejemplo: `1490818096001`

1. **Formato y Estructura**:

   - Debe tener 13 dígitos.
   - El tercer dígito debe ser `9`.
   - El dígito verificador es el décimo dígito (en este caso `6`).
   - Los últimos 3 dígitos (`001`) representan el establecimiento.
   - Coeficientes: `4, 3, 2, 7, 6, 5, 4, 3, 2`.

2. **Multiplicación de coeficientes**:

   - Multiplica los primeros 9 dígitos con su coeficiente correspondiste.

   | Pos | Díg | Coef | Res |
   | --- | --- | ---- | --- |
   | 1   | 1   | 4    | 4   |
   | 2   | 4   | 3    | 12  |
   | 3   | 9   | 2    | 18  |
   | 4   | 0   | 7    | 0   |
   | 5   | 8   | 6    | 48  |
   | 6   | 1   | 5    | 5   |
   | 7   | 8   | 4    | 32  |
   | 8   | 0   | 3    | 0   |
   | 9   | 9   | 2    | 18  |

3. **Sumatoria y calculo de módulo 11**:

   - Sumar los resultados: `4 + 12 + 18 + 0 + 48 + 5 + 32 + 0 + 18 = 137`
   - Aplicar módulo 11 al total: `137 % 11 = 5`

4. **Comparación Final**:
   - Restar el resultado de 11: `11 - 5 = 6`
   - Comparar con el dígito verificador, que en este caso es `6`. Por lo tanto el RUC es válido.

### RUC Público

#### RUC de ejemplo: `0160063270001`

1. **Formato y Estructura**:

   - Debe tener 13 dígitos.
   - El tercer dígito debe ser `6`.
   - El dígito verificador es el noveno dígito (en este caso, `7`).
   - Los últimos 3 dígitos (`001`) representan el establecimiento.
   - Coeficientes: `3, 2, 7, 6, 5, 4, 3, 2`.

2. **Multiplicación de coeficientes**:

   | Pos | Díg | Coef | Res |
   | --- | --- | ---- | --- |
   | 1   | 0   | 3    | 0   |
   | 2   | 1   | 2    | 2   |
   | 3   | 6   | 7    | 42  |
   | 4   | 0   | 6    | 0   |
   | 5   | 0   | 5    | 0   |
   | 6   | 6   | 4    | 24  |
   | 7   | 3   | 3    | 9   |
   | 8   | 2   | 2    | 4   |

3. **Sumatoria y calculo de módulo 11**:

   - Sumar los resultados: `0 + 2 + 42 + 0 + 0 + 24 + 9 + 4 = 81`
   - Aplicar módulo 11 al total: `81 % 11 = 4`

4. **Comparación Final**:
   - Restar el resultado de 11: `11 - 4 = 7`
   - Comparar con el dígito verificador que en este caso es (`7`). Por lo tanto el RUC es válido.
