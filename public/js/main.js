import { validateEcuadorianID, validateRUC } from './validations.js'

const tabsCont = document.querySelector('.tabs')
const formsCont = document.querySelector('.tabs__forms')
const tabsItems = tabsCont.querySelectorAll('.tabs__list li')
const forms = formsCont.querySelectorAll('form')
const valElem = document.querySelector('.tabs__val')

// Tabs switches
tabsCont.addEventListener('click', ({ target }) => {
  if (target.tagName !== 'LI') return
  const tabId = target.dataset.tab

  tabsItems.forEach((tab) =>
    tab.classList.toggle('active', tab.dataset.tab === tabId)
  )
  forms.forEach((sec) =>
    sec.classList.toggle('show', sec.dataset.form === tabId)
  )

  target.classList.add('active')
  clearInputs()
})

// Clear input fields and reset validation statuses
function clearInputs() {
  toggleValIcons()
  forms.forEach((form) => {
    // updateInputValidation(form[0])
    form[0].value = ''
  })
}

// Toggle validation icon and status message
function toggleValIcons(status, message) {
  valElem.classList.remove('success', 'error', 'load')
  valElem.firstChild.textContent = ''

  if (status) valElem.classList.add(status)
  if (message) valElem.firstChild.textContent = message
}

// Update input field validation status
function updateInputValidation(input, isValid = null) {
  input.classList.remove(...statuses)
  if (isValid !== null) {
    input.classList.add(isValid ? 'success' : 'error')
  }
}

// Inputs events
formsCont.addEventListener('input', ({ target }) => {
  const value =
    target.id === 'input-cedula'
      ? target.value.slice(0, 10)
      : target.id === 'input-ruc'
      ? target.value.slice(0, 13)
      : ''

  target.value = value
  toggleValIcons()

  if (value.length > 0) toggleValIcons('load', '...')

  if (value.length === 10) {
    const isValid = validateEcuadorianID(value)
    toggleValIcons(
      isValid ? 'success' : 'error',
      isValid ? 'Cédula válida' : 'Cédula no válida'
    )
  }

  if (value.length === 13) {
    const res = validateRUC(value)
    toggleValIcons(
      res.isValid ? 'success' : 'error',
      res.isValid ? `${res.type} válido` : 'RUC no válido'
    )
  }
})
