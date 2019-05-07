const defaultState = {
  upperCase: false,
  lowerCase: false,
  specialCase: false,
  numberCase: false,
  lengthCase: false
}

const validationInput = (state = defaultState, actions) => {

  let newStatus = {
    upperCase: false,
    lowerCase: false,
    specialCase: false,
    numberCase: false,
    lengthCase: false
  }

  switch (actions.type) {
    
    case 'put/validation/reset':
      return newStatus
      
    case 'put/validation':

      if (actions.payload.length >= 5) {
        newStatus.lengthCase = true
      } else {
        newStatus.lengthCase = false
      }

      let patt = new RegExp(/[0-9]/)

      if (patt.test(actions.payload)) {
        newStatus.numberCase = true
      } else {
        newStatus.numberCase = false
      }

      patt = /[^0-9a-zA-Z_]/

      if (patt.test(actions.payload)) {
        newStatus.specialCase = true
      } else {
        newStatus.specialCase = false
      }

      patt = /[a-z]/
      if (patt.test(actions.payload)) {
        newStatus.lowerCase = true
      } else {
        newStatus.lowerCase = false
      }

      patt = /[A-Z]/
      if (patt.test(actions.payload)) {
        newStatus.upperCase = true
      } else {
        newStatus.upperCase = false
      }

    return newStatus

    default:
      return state
  }
}

export default validationInput
