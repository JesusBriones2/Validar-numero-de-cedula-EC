// validación de numero de cedula
export function validateCI(ci) {
  const coefficient = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  let sumTotal = 0

  // Multiplicación de los coeficientes
  for (let i = 0; i < 9; i++) {
    const res = parseInt(ci[i]) * coefficient[i]
    sumTotal += res >= 10 ? res - 9 : res
  }

  // Calculo de dígito verificador
  let digit = 10 - (sumTotal % 10)
  digit = digit === 10 ? 0 : digit

  return digit === parseInt(ci[9]) ? true : false
}

// Validación de RUC
export function validateRUC(ruc) {}
