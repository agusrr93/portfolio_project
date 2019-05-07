const defaultState = {
  userData: []
}

const userData = (state = defaultState, actions) => {
  switch (actions.type) {
    case 'get/userData':
      return {
        ...state,
        userData: actions.payload
      }
  
    default:
      return state
  }
}

export default userData
