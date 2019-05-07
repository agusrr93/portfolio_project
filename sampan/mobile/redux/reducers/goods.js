let initial_state={
  name:'iam',
  text:'message1',
  images:"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
  data:[],
  loading:false,
  loadingSlider:true,
  cart:[],
  error:'nothing',
  form:[],
  total:'',
  checkout:[],
  slider:[],
  message:'',
  loadingatc:false,
  confirm:false,
  userData:[],
  mitraData:[]
}

export const goodsReducer=(state=initial_state,action)=>{
  console.log('from reducer')
  switch (action.type) {
    case 'GOODS_RECEIVED':
        return {...state,images:action.payload[1].photos[0],loading:false,data:action.payload}
    case 'GOODS_REQUEST_FAILED':
        return {...state,text:'error',loading:false,error:'error getting list of goods'}
    case 'GET_GOODS':
          return {
              ...state,loading:true,text:'ngeget goods'
          }
    case 'GET_CART':
          return {
             ...state,loading:true
          }
    case 'GET_CART_SUCCESS':
          let form=action.payload.form
          let dataform=form.map(data=>{return data.toString()})
          return {
              ...state,cart:action.payload.cart,loading:false,form:dataform
          }
    case 'GET_CART_FAILED':
          return {
              ...state,loading:false,error:'error getting user cart'
          }
    case 'GET_CHECKOUT':
          return {
              ...state,loading:true
          }
    case 'GET_CHECKOUT_SUCCESS':
          console.log('payload',action.payload)
          return {
              ...state,loading:false,checkout:action.payload,total:action.payload.total
          }
    case 'GET_CHECKOUT_FAILED':
          return {
              ...state,loading:false,error:'error getting user transaction'
          }
    case 'GET_SLIDER_SUCCESS':
          return {
                    ...state,slider:action.payload,loading:false
          }
    case 'GET_SLIDER_FAILED':
          return {
              ...state,loading:false,error:'error getting slider cart'
          }
    case 'ADD_TO_CART_SUCCESS':
          return {
              ...state,message:'SUCCESS ADD TO CART',loadingatc:false
          }
    case 'ADD_TO_CART_FAILED':
          return {
              ...state,loadingatc:false,message:'FAILED ADD TO CART'
          }
    case 'CLEAR_MESSAGE':
          return {
              ...state,loadingatc:false,message:''
          }
    case 'ADD_TO_CART':
          return {
              ...state,loadingatc:true
          }
    case 'SET_WISHLIST_SUCCESS':
          return {
              ...state,message:'SUCCESS ADD WISH LIST',loadingatc:false
          }
    case 'SET_WISHLIST_FAILED':
          return {
              ...state,message:'FAILED ADD WISH LIST',loadingatc:false
          }
    case 'SET_WISHLIST':
          return{
             ...state,loadingatc:true
          }
    case 'CONFIRM_ORDER':
          return{
             ...state,loading:true,message:'PROCESSING YOUR PURCHASE'
          }
    case 'CONFIRM_ORDER_FAILED':
          return{
            ...state,loading:false,confirm:false,message:'FAILED TO CONFIRM YOUR ORDER , TRY AGAIN LATER'
          }
    case 'CONFIRM_ORDER_SUCCESS':
          return{
            ...state,loading:false,confirm:true,message:'YOUR ORDER ALREADY CONFIRMED , HAPPY SHOPPING'
          }
    case 'USER_TRANSACTION':
          return{
            ...state,loading:true,message:'GETTING TRANSACTION'
          }
    case 'USER_TRANSACTION_FAILED':
          return{
            ...state,loading:false,userData:[],message:'CANNOT GETTING USER_DATA'
          }
    case 'USER_TRANSACTION_SUCCESS':
          return{
            ...state,loading:false,userData:action.payload,message:'FETCHING USER SUCCESSFULLY'
          }
    case 'MITRA_TRANSACTION':
          return{
            ...state,loading:true,message:'GETTING TRANSACTION'
          }
    case 'MITRA_TRANSACTION_FAILED':
          return{
            ...state,loading:false,mitraData:[],message:'CANNOT GETTING USER_DATA'
          }
    case 'MITRA_TRANSACTION_SUCCESS':
          return{
            ...state,loading:false,mitraData:action.payload,message:'FETCHING USER SUCCESSFULLY'
          }
    default:
        return state
  }
}
