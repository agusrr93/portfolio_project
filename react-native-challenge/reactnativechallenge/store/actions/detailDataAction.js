export default function (payload) {
    return function (dispatch) {
        dispatch({
            type:'DETAILDATA',
            payload: payload
        })
    }
}