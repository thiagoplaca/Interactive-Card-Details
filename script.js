// CardName
let nameCard = document.querySelector('.card_details_name')
let nameInput = document.querySelector('#cardholder')
let nameErrorDiv = document.querySelector('.form_cardholder--error')

// CardNumber
let numberCard = document.querySelector('.card_number')
let numberInput = document.querySelector('#cardNumber')
let numberErrorDiv = document.querySelector('.form_inputnumber--error')

// MM
let monthCard = document.querySelector('.card_month')
let monthInput = document.querySelector('#cardMonth')
let monthErrorDiv = document.querySelector('.form_input-mm--error')

// YY

let yearCard = document.querySelector('.card_year')
let yearInput = document.querySelector('#cardYear')
let yearErrorDiv = document.querySelector('.form_input-yy--error')

// CVC

let cvcCard = document.querySelector('.card_back_cvc')
let cvcInput = document.querySelector('#cardCvc')
let cvcErrorDiv = document.querySelector('.form_input-cvc--error')

nameInput.addEventListener('input', () => {
  if (nameInput.value == "") {
    nameCard.innerText = 'JANE APPLESEED'
  } else {
    nameCard.innerText = nameInput.value
  }
})

numberInput.addEventListener('input', event => {

  let inputValue = event.target.value
  numberCard.innerText = numberInput.value

  let regExp = /[A-z]/g
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberErrorDiv, "Wrong format, numbers only")

  } else {
    numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim()
    showError(numberInput, numberErrorDiv, '', false)
  }

  if (numberInput.value == '') {
    numberCard.innerText = '0000 0000 0000 0000'
  }
})

monthInput.addEventListener('input', () => {
  monthCard.innerText = monthInput.value
  validateLetter(monthInput, monthErrorDiv)
})

yearInput.addEventListener('input', () => {
  yearCard.innerText = yearInput.value
  validateLetter(yearInput, yearErrorDiv)
})

cvcInput.addEventListener('input', () => {
  cvcCard.innerText = cvcInput.value
  validateLetter(cvcInput, cvcErrorDiv)
})

// Confirm Button
let confirmBtn = document.querySelector('.form_submit')

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Form 

let formSection = document.querySelector('.form')
let thanksSection = document.querySelector('.thanks-section')

confirmBtn.addEventListener('click', event => {
  event.preventDefault()

  // Verify Name
 if(verifyIsFilled(nameInput, nameErrorDiv)) {
  nameValidation = true
 } else {
  nameValidation = false;
 }

  // Verify Number
  if (verifyIsFilled(numberInput, numberErrorDiv) == true) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberErrorDiv, '', false)
      numberValidation = true
    } else {
      showError(numberInput, numberErrorDiv, 'Wrong number')
      numberValidation = false
    }
  }

  // Verify Month
  if (verifyIsFilled(monthInput, monthErrorDiv)) {
    if(parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      showError(monthInput, monthErrorDiv, '', false)
      monthValidation = true
    } else {
      showError(monthInput, monthErrorDiv, 'Wrong Month')
      monthValidation = false
    }
  }

  // Verify Year 
  if(verifyIsFilled(yearInput, yearErrorDiv)) {
    if (parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27) {
      showError(yearInput, yearErrorDiv, '', false)
      yearValidation = true
    } else {
      showError(yearInput, yearErrorDiv, 'Wrong year')
      yearValidation = false
    }
  }

  // Verify CVC
  if(verifyIsFilled(cvcInput, cvcErrorDiv)) {
    if (cvcInput.value.length == 3) {
      showError(cvcInput, cvcErrorDiv, '', false)
      cvcValidation = true
    } else {
      showError(cvcInput, cvcErrorDiv, 'Wrong CVC')
      cvcValidation = false
    }
  }

  if(nameValidation == true && numberValidation == true && monthValidation == true && yearValidation == true && cvcValidation == true) {
    formSection.style.display = 'none'
    thanksSection.style.display = 'block'
  } 
})


function showError(divInput, divError, msgError, show = true) {
    if (show) {
      divError.innerText = msgError
      divInput.style.borderColor = '#ff0000'

    } else {
      divError.innerText = msgError
      divInput.style.borderColor = 'hsl(270, 3%, 87%)'

    }
  }

function verifyIsFilled (divInput, divError) {
  if (divInput.value.length > 0) {
    showError(divInput, divError, '', false)
    return true
  } else {
    showError(divInput, divError, "Can't be blank")
    return false
  }
}

function validateLetter(input, divError) {
  let regExp = /[A-z]/g
  if (regExp.test(input.value)) {
    showError(input, divError, "Only numbers")
} else {
  showError(input, divError, "", false)
}
}