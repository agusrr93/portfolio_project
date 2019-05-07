let initial_state={
  detail:[],
  loading:true,
  error:false
}

export const detailReducer=(state=initial_state,action)=>{
  switch (action.type) {
    case 'GET_DETAIL_SUCCESS':
        return {
            ...state,detail:action.payload,error:false,loading:false
        }
    case 'GET_DETAIL_FAILED':
        return {
            ...state,loading:false,error:true
        }
    case 'GET_DETAIL':
        return {
            ...state,loading:true,error:false
        }
    case 'SET_DETAIL_LOADING':
        return {
            ...state,loading:true,error:false
        }
    default:
        return state
  }
}
