const defaultState = {
  showAction: null
}

const showAction = (state = defaultState, actions) => {
  switch (actions.type) {
    case 'put/showAction':
      return {
        ...state,
        showAction: actions.payload
      }
  
    default:
      return state
  }
}

export default showAction
