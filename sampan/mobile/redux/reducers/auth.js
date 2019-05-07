let initial_state={
  name:'',
  email:'',
  token:'',
  loading:false,
  error:false,
  verify:false,
  registerStatus:false
}

export const authReducer=(state=initial_state,action)=>{
  switch (action.type) {
    case 'LOGIN_SUCCESS':
        return {
          ...state,token:action.payload,loading:false,error:false
        }
    case 'GET_PROFILE_SUCCESS':
        return {
            ...state,name:action.payload.name,
            email:action.payload.email,
            verify:action.payload.verify,
            loading:false,
            error:false
        }
    case 'LOGIN_FAILED':
        return {
            ...state,loading:false,error:true
        }
    case 'AUTH_PEOPLE':
        return {
            ...state,loading:true,error:false
        }
    default:
        return state
  }
}
