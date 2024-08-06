import { validateEcuadorianID, validateRUC } from './validations.js'

// Utility function for selecting DOM elements
const $ = (selector, context = document) => context.querySelector(selector)
const $$ = (selector, context = document) =>
  Array.from(context.querySelectorAll(selector))

// DOM Elements
const tabList = $('.tabs__list')
const tabSections = $$('.tabs__section')
const validationIcons = $('.validations').children
const cedulaInput = $('#input_cedula')
const rucInput = $('#input_ruc')
const forms = $$('form')

// Prevent default form submission behavior
forms.forEach((form) =>
  form.addEventListener('submit', (e) => e.preventDefault())
)

// Control tab switching
let activeTab = tabList.querySelector('.active')
tabList.addEventListener('click', ({ target }) => {
  if (!target.classList.contains('tabs__item')) return

  const ACTIVE_CLASS = 'active'
  const tabName = target.dataset.tab

  if (tabName === activeTab.dataset.tab) return

  activeTab.classList.remove(ACTIVE_CLASS)
  target.classList.add(ACTIVE_CLASS)

  tabSections.forEach((section) => {
    section.classList.toggle(ACTIVE_CLASS, section.dataset.tabsec === tabName)
  })

  activeTab = target
  clearInputs()
})

// Clear input fields and reset validation statuses
function clearInputs() {
  cedulaInput.value = ''
  rucInput.value = ''
  updateValidationIcon()
  updateInputValidation(cedulaInput)
  updateInputValidation(rucInput)
}

// Update validation icon and status message
const statuses = ['success', 'error']
let activeIcon = null

/**
 * Updates the validation icon and status message.
 * @param {string} [status] - The validation status ('load', 'success', or 'error').
 * @param {string} [message] - The status message to display.
 */
function updateValidationIcon(status, message) {
  const iconMap = { load: 1, success: 2, error: 3 }

  if (activeIcon) activeIcon.classList.remove('show')
  activeIcon = status ? validationIcons[iconMap[status]] : null
  validationIcons[0].classList.remove(...statuses)

  if (statuses.includes(status)) {
    validationIcons[0].classList.add(status)
  }

  validationIcons[0].textContent = message ?? ''
  if (activeIcon) activeIcon.classList.add('show')
}

// Update input field validation status
/**
 * Updates the validation status of an input field.
 * @param {HTMLInputElement} input - The input field to update.
 * @param {boolean|null} [isValid] - The validation result (true or false). If null, only the existing classes are removed.
 */
function updateInputValidation(input, isValid = null) {
  input.classList.remove(...statuses)
  if (isValid !== null) {
    input.classList.add(isValid ? 'success' : 'error')
  }
}

// Cedula validation event
cedulaInput.addEventListener('input', ({ target }) => {
  const cedula = target.value.slice(0, 10)
  target.value = cedula

  updateValidationIcon()
  updateInputValidation(target)

  if (cedula.length > 0) {
    updateValidationIcon('load', '...')
  }

  if (cedula.length === 10) {
    const isValid = validateEcuadorianID(cedula)
    updateValidationIcon(
      isValid ? 'success' : 'error',
      isValid ? 'Cédula válida' : 'Cédula no válida'
    )
    updateInputValidation(target, isValid)
  }
})

// RUC validation event
rucInput.addEventListener('input', ({ target }) => {
  const ruc = target.value.slice(0, 13)
  target.value = ruc

  updateValidationIcon()
  updateInputValidation(target)

  if (ruc.length > 0) {
    updateValidationIcon('load', '...')
  }

  if (ruc.length === 13) {
    const res = validateRUC(ruc)
    updateValidationIcon(
      res.isValid ? 'success' : 'error',
      res.isValid ? `${res.type} válido` : 'RUC no válido'
    )
    updateInputValidation(target, res.isValid)
  }
})
