const defaultState = {
  currentUser: null
}

const currentUser = (state = defaultState, actions) => {
  switch (actions.type) {
    case 'put/currentUser':
      return {
        ...state,
        currentUser: actions.payload
      }
  
    default:
      return state
  }
}

export default currentUser
