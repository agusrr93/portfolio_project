export default function (val) {
  return function (dispatch) {
    dispatch({type: 'put/showAction', payload: val})
    if (val === null) {
      dispatch({type: 'delete/inputData/all'})
      dispatch({type: 'put/validation/reset'})
    }
  }
}
