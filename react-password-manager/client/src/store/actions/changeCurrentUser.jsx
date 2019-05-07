export default function (val) {
  return function (dispatch) {
    dispatch({type: 'put/currentUser', payload: val})
  }
}
