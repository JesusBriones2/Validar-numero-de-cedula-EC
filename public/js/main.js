import { validateCI, validateRUC } from './validations.js'

const $ = (selector, context = document) => context.querySelector(selector)
const $$ = (selector, context = document) =>
  Array.from(context.querySelectorAll(selector))

// Elementos del Dom
const tabsElem = $('.tabs__list')
const tabsSectionsElem = $$('.tabs__section')
const validationsElem = $('.validations').children
const inputCedula = $('#input_cedula')
const inputRUC = $('#input_ruc')

// Control de tabs y secciones
let tabActive = tabsElem.querySelector('.active')
tabsElem.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('tabs__item')) return

  const CLASS_NAME = 'active'
  const tabName = target.dataset.tab

  if (tabName === tabActive.dataset.tab) return

  tabActive.classList.remove(CLASS_NAME)
  target.classList.add(CLASS_NAME)

  tabsSectionsElem.forEach((sec) => {
    sec.classList.remove(CLASS_NAME)
    if (sec.dataset.tabsec === tabName) {
      sec.classList.add(CLASS_NAME)
      tabActive = target
      clearInputs()
    }
  })
})

function clearInputs() {
  inputCedula.value = ''
  inputRUC.value = ''
  statusValidationIcon()
  statusValidationInput(inputCedula)
  statusValidationInput(inputRUC)
}

// Muestra el icono y un mensaje según el estado de la validación
const validStatuses = ['success', 'error']
let iconShowing = null

function statusValidationIcon(status, message) {
  const iconsMap = {
    load: 1,
    success: 2,
    error: 3,
  }

  iconShowing?.classList.remove('show')
  iconShowing = status ? validationsElem[iconsMap[status]] : null
  validationsElem[0].classList.remove(...validStatuses)

  if (validStatuses.includes(status)) {
    validationsElem[0].classList.add(status)
  }

  validationsElem[0].textContent = message ?? ''
  iconShowing?.classList.add('show')
}

// Cambia el color del input según el estado de la validación
function statusValidationInput(input, isValid = null) {
  input.classList.remove(...validStatuses)
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
    statusValidationIcon('load', '...')
  }

  if (ci.length === 10) {
    const isValid = validateCI(ci)
    statusValidationIcon(
      isValid ? 'success' : 'error',
      isValid ? 'Cédula valida' : 'Cédula no valida'
    )
    statusValidationInput(target, isValid)
  }
})

// Evento de validación de RUC
inputRUC.addEventListener('input', ({ target }) => {})
