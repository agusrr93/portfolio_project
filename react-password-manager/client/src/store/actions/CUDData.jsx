export default function (id, payload, option) {
  return function (dispatch) {
    dispatch( { type: 'manipulateData', payload: payload , id:id})
    if (option !== 'del') {
      dispatch( { type: 'delete/inputData/all'})
      dispatch({type: 'put/showAction', payload: null})
    }
  }
}
