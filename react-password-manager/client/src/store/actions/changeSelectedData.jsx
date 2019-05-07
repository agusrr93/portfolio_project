export default function (val) {
  return function (dispatch) {
    dispatch({type: 'put/selectedData', payload: val})
  }
}
