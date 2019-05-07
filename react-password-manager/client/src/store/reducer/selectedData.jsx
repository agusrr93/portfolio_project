const defaultState = {
  selectedData: null
}

const selectedData = (state = defaultState, actions) => {
  switch (actions.type) {
    case 'put/selectedData':
      return {
        ...state,
        selectedData: actions.payload
      }
  
    default:
      return state
  }
}

export default selectedData
