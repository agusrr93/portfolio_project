const defaultState = {
  inputUrlSite: '',
  inputUsernameOrEmail: '',
  inputPassword: ''
  
}

const inputData = (state = defaultState, actions) => {
  switch (actions.type) {
    case 'delete/inputData/all':
      return {
        inputUrlSite: '',
        inputUsernameOrEmail: '',
        inputPassword: ''
      }
    case 'put/inputData/all':
      return actions.payload

    case 'put/inputData':
      return {
        ...state,
        [actions.property]: actions.payload
      }
  
    default:
      return state
  }
}

export default inputData
