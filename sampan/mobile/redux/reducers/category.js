let initial_state={
  category:[],
  loading:true,
  error:false
}

export const categoryReducer=(state=initial_state,action)=>{
  switch (action.type) {
    case 'GET_CATEGORY_SUCCESS':
        return {
            ...state,category:action.payload,error:false,loading:false
        }
    case 'GET_CATEGORY_FAILED':
        return {
            ...state,loading:false,error:true
        }
    default:
        return state
  }
}
