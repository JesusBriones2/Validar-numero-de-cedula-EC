;(() => {
  const $ = (selector, context = document) => context.querySelector(selector)
  const $$ = (selector, context = document) =>
    Array.from(context.querySelectorAll(selector))

  // Elementos del Dom
  const tabsElem = $('.tab__items')
  const sectionsElem = $$('.tab__section')
  const iconsElem = $('.tab__section--icons')
  const inputCedula = $('#input-cedula')
  const inputRUC = $('#input-ruc')

  let tabActive = tabsElem.querySelector('.active').dataset.tab

  function clearInputs() {
    inputCedula.value = ''
    inputRUC.value = ''
    statusValidationIcon()
    statusValidationInput(inputCedula)
    statusValidationInput(inputRUC)
  }

  // Control de tabs y secciones
  tabsElem.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('tab__item')) return

    const CLASS_NAME = 'active'
    const tabName = target.dataset.tab

    if (tabName === tabActive) return

    tabsElem.querySelector(`.${CLASS_NAME}`).classList.remove(CLASS_NAME)
    target.classList.add(CLASS_NAME)

    sectionsElem.forEach((sec) => {
      sec.classList.remove(CLASS_NAME)
      if (sec.dataset.sec === tabName) {
        sec.classList.add(CLASS_NAME)
        tabActive = tabName
        clearInputs()
      }
    })
  })

  // validación de numero de cedula
  function validateCI(ci) {
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
  function validateRUC(ruc) {

  }

  // Muestra el icono según el estado de la validación
  function statusValidationIcon(status) {
    const iconsMap = {
      load: 0,
      success: 1,
      error: 2,
    }
    iconsElem.querySelector('.show')?.classList.remove('show')
    iconsElem.children[iconsMap[status]]?.classList.add('show')
  }

  // Cambia el color del input según el estado de la validación
  function statusValidationInput(input, isValid = null) {
    input.classList.remove('success', 'error')
    if (isValid !== null) {
      input.classList.add(isValid ? 'success' : 'error')
    }
  }

  // Evento de validación de cédula
  inputCedula.addEventListener('input', ({ target }) => {
    let ci = target.value ? target.value.slice(0, 10) : ''
    target.value = ci

    statusValidationIcon()
    statusValidationInput(target)

    if (ci.length > 0) {
      statusValidationIcon('load')
    }

    if (ci.length === 10) {
      const isValid = validateCI(ci)
      statusValidationIcon(isValid ? 'success' : 'error')
      statusValidationInput(target, isValid)
    }
  })

  // Evento de validación de RUC
  inputRUC.addEventListener('input', ({ target }) => {
    
  })
})()
