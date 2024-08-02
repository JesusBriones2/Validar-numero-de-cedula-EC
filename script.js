;(() => {
  const $ = (selector, context = document) => context.querySelector(selector)
  const $$ = (selector, context = document) =>
    Array.from(context.querySelectorAll(selector))

  // Control de tabs y secciones
  const tabsElem = $('.tab__items')
  const sectionsElem = $$('.tab__section')
  const iconsElem = $('.tab__section--icons')
  const inputCedula = $('#input-cedula')
  const inputRuc = $('#input-ruc')

  function clearInputs() {
    inputCedula.value = ''
    inputRuc.value = ''
  }

  // Control de tabs y secciones
  tabsElem.addEventListener('click', ({ target }) => {
    const CLASS_NAME = 'active'
    if (!target.classList.contains('tab__item')) return
    const tabName = target.dataset.tab

    tabsElem.querySelector(`.${CLASS_NAME}`).classList.remove(CLASS_NAME)
    target.classList.add(CLASS_NAME)

    sectionsElem.forEach((sec) => {
      sec.classList.remove(CLASS_NAME)
      if (sec.dataset.sec === tabName) {
        sec.classList.add(CLASS_NAME)
      }
    })
  })

  // Validaciones de cedula y ruc

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

  function showValidationStatus(status) {
    const iconsMap = {
      load: 0,
      success: 1,
      error: 2,
    }

    iconsElem.querySelector('.show')?.classList.remove('show')
    iconsElem.children[iconsMap[status]]?.classList.add('show')
  }

  inputCedula.addEventListener('input', ({ target }) => {
    let ci = target.value ? target.value.slice(0, 10) : ''
    target.value = ci

    const isValid = validateCI(ci)
    const CLASS_NAME = 'show'

    showValidationStatus()
    target.classList.remove('success', 'error')

    if (ci.length > 0 && ci.length < 10) {
      showValidationStatus('load')
    }

    if (ci.length === 10) {
      showValidationStatus(isValid ? 'success' : 'error')
      target.classList.add(isValid ? 'success' : 'error')
    }
  })

  inputRuc.addEventListener('input', ({ target }) => {})
})()
