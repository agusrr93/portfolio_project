export default function (val, property) {
  return function (dispatch) {
    if (property === 'resetAll') {
      dispatch({type: 'put/inputData/all', payload: val})
      dispatch({type: 'put/validation', payload: val.inputPassword, property})
    } else {
      dispatch({type: 'put/inputData', payload: val, property})
      if (property === 'inputPassword') {
        dispatch({type: 'put/validation', payload: val, property})
      }
    }
  }
}
