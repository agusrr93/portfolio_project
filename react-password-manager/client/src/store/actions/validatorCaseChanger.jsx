export default function (val, property) {
  return function (dispatch) {
    dispatch({type: 'put/validation', payload: val, property})
  }
}
