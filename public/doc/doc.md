# Proceso de Validación de Cedula y RUC del ecuador

## Números de Cédulas

Dado el número de cédula: `sdasd`

- Será exactamente una cadena de 10 dígitos numéricos.
- El último dígito de la cadena será el dígito verificador (5 para el número de cédula dado).
- Los dos primeros dígitos (17) corresponden a la provincia en la cual se emitió el documento. No serán menores a 0 ni mayores a 24.
- Coeficientes a utilizar son: 2, 1, 2, 1, 2, 1, 2, 1, 2, 1.

Cada dígito de la cédula (con excepción al último dígito verificador) será multiplicado por un coeficiente de su misma posición. Como se muestra a continuación.

| Posición | Dígito de la Cédula | Coeficiente | Resultado de la Multiplicación |
|----------|---------------------|-------------|--------------------------------|
| 0        | 1                   | 2           | 2                              |
| 1        | 7                   | 1           | 7                              |
| 2        | 1                   | 2           | 2                              |
| 3        | 0                   | 1           | 0                              |
| 4        | 0                   | 2           | 0                              |
| 5        | 3                   | 1           | 3                              |
| 6        | 4                   | 2           | 8                              |
| 7        | 0                   | 1           | 0                              |
| 8        | 6                   | 2           | 12                             |

Si el resultado de la multiplicación es mayor o igual que 10, se le resta 9.

| Resultado de la Multiplicación | Cantidad a restar | Resultado |
|--------------------------------|-------------------|-----------|
| 2                              |                   | 2         |
| 7                              |                   | 7         |
| 2                              |                   | 2         |
| 0                              |                   | 0         |
| 0                              |                   | 0         |
| 3                              |                   | 3         |
| 8                              |                   | 8         |
| 0                              |                   | 0         |
| 12                             | -9                | 3         |

Se suman los resultados: `2 + 7 + 2 + 0 + 0 + 3 + 8 + 0 + 3 = 25`

Al resultado de la suma (25) se le aplica el módulo 10. (`25 % 10 = 5`)

### Comparación

Si el resultado al aplicar el módulo 10 es igual a 0, se compara inmediatamente con el último dígito verificador. En el caso de ser iguales, se asume que es una cédula válida; caso contrario, es una cédula inválida. (No se aplica para este caso, ya que el resultado anterior fue 5)

Caso contrario, al número 10 se le resta el resultado de la aplicación del módulo (5). (Si aplica para este caso)

`10 - 5 = 5`

Este resultado (5) es comparado con el último dígito verificador (5), en el caso de ser iguales, se asume que es una cédula válida; caso contrario, es una cédula inválida.

`5 == 5`

Es una cédula válida.

## Números de RUCs (Registro Único de Contribuyentes)

Será exactamente una cadena de 13 dígitos numéricos.

- Los dos primeros dígitos corresponden a la provincia en la cual se emitió el documento. No serán menores a 0 ni mayores a 24.
- Los últimos tres dígitos corresponderán al número de establecimientos adicionales. (001, 002, 003, ...)

El RUC tiene tres clasificaciones:

1. **RUC Natural**
2. **RUC Jurídicos y extranjeros sin cédula**
3. **RUC Públicos**

### RUC Natural

Dado el número de RUC: `1713175071001`

- El tercer dígito del RUC estará dentro del rango de 0 a 5 (### [0-5] #########). (Para el ejemplo, el tercer dígito es 1)
- Se extraen los 10 primeros dígitos que serán validados como si fuera un número de cédula. (`1713175071`)

### RUC Jurídicos y Extranjeros sin Cédula

Dado el número de RUC: `1790085783001`

- El tercer dígito del RUC será siempre 9. (##9##########)
- El dígito verificador será el de la décima posición. (3 para el ejemplo)
- Los coeficientes a utilizar son: 4, 3, 2, 7, 6, 5, 4, 3, 2.

Cada dígito del RUC (con excepción al dígito verificador y los tres últimos) será multiplicado por un coeficiente de su misma posición. Como se muestra a continuación.

| Posición | Dígito de la Cédula | Coeficiente | Resultado de la Multiplicación |
|----------|---------------------|-------------|--------------------------------|
| 0        | 1                   | 4           | 4                              |
| 1        | 7                   | 3           | 21                             |
| 2        | 9                   | 2           | 18                             |
| 3        | 0                   | 7           | 0                              |
| 4        | 0                   | 6           | 0                              |
| 5        | 8                   | 5           | 40                             |
| 6        | 5                   | 4           | 20                             |
| 7        | 7                   | 3           | 21                             |
| 8        | 8                   | 2           | 16                             |

Se suman los resultados: `4 + 21 + 18 + 0 + 0 + 40 + 20 + 21 + 16 = 140`

Al resultado de la suma (140) se le aplica el módulo 11. (`140 % 11 = 8`)

### Comparación

Si el resultado al aplicar el módulo 11 es igual a 0, se compara inmediatamente con el último dígito verificador. En el caso de ser iguales, se asume que el RUC es válido; caso contrario, el RUC es inválido. (No se aplica para este caso, ya que el resultado anterior fue 8)

Caso contrario, al número 11 se le resta el resultado de la aplicación del módulo (8). (Si aplica para este caso)

`11 - 8 = 3`

Este resultado (3) es comparado con el dígito verificador (3), en el caso de ser iguales, se asume que el RUC es válido; caso contrario, el RUC es inválido.

`3 == 3`

Es un RUC válido.

### RUC Públicos

Dado el número de RUC: `1260004800001`

- El tercer dígito del RUC será siempre 6. (##6##########)
- El dígito verificador será el de la novena posición. (0 para el ejemplo)
- Los coeficientes a utilizar son: 3, 2, 7, 6, 5, 4, 3, 2.

Cada dígito del RUC (con excepción al dígito verificador y los cuatro últimos) será multiplicado por un coeficiente de su misma posición. Como se muestra a continuación.

| Posición | Dígito de la Cédula | Coeficiente | Resultado de la Multiplicación |
|----------|---------------------|-------------|--------------------------------|
| 0        | 1                   | 3           | 3                              |
| 1        | 2                   | 2           | 4                              |
| 2        | 6                   | 7           | 42                             |
| 3        | 0                   | 6           | 0                              |
| 4        | 0                   | 5           | 0                              |
| 5        | 0                   | 4           | 0                              |
| 6        | 4                   | 3           | 12                             |
| 7        | 8                   | 2           | 16                             |

Se suman los resultados: `3 + 4 + 42 + 0 + 0 + 0 + 12 + 16 = 77`

Al resultado de la suma (77) se le aplica el módulo 11. (`77 % 11 = 0`)

### Comparación

Si el resultado al aplicar el módulo 11 es igual a 0, este es comparado con el último dígito verificador; en el caso de ser iguales, se asume que el RUC es válido; caso contrario, el RUC es inválido.

`0 == 0`

Es un RUC válido.

Caso contrario, al número 11 se le resta el resultado de la aplicación del módulo. (No se aplica para este caso, ya que el resultado anterior fue 0)

Este resultado es comparado con el dígito verificador; en el caso de ser iguales, se asume que el RUC es válido; caso contrario, el RUC es inválido.