module.exports={
  fetchPeople:function(){
    return {type:'GET_PEOPLE'}
  },
  fetchGoods:function(){
    return {type:'GET_GOODS'}
  },
  authPeople:function(payload){
    return {type:'AUTH_PEOPLE',payload:payload}
  },
  fetchDetail:function(payload){
    return {type:'FETCH_DETAIL',payload:payload}
  },
  setloading:function(){
    return {type:'SET_LOADING'}
  },
  addToCart:function(payload){
    return {type:'ADD_TO_CART',payload:payload}
  },
  getCart:function(payload){
    return {type:'GET_CART',payload:payload}
  },
  getCheckout:function(payload){
    return {type:'GET_CHECKOUT',payload:payload}
  },
  getSlider:function(){
    return {type:'GET_SLIDER'}
  },
  getCategory:function(){
    return {type:'GET_CATEGORY'}
  },
  setWishlist:function(payload){
    return {type:'SET_WISHLIST',payload:payload}
  },
  getCart:function(payload){
    return {type:'GET_CART',payload}
  },
  deleteItem:function(payload){
    return {type:'DELETE_ITEM',payload}
  },
  confirmOrder:function(payload){
    return {type:'CONFIRM_ORDER',payload:payload}
  },
  clearMessage:function(payload){
    return {type:'CLEAR_MESSAGE'}
  },
  getUserTransaction:function(payload){
    return {type:'USER_TRANSACTION',payload:payload}
  },
  getMitraTransaction:function(payload){
    return {type:'MITRA_TRANSACTION',payload:payload}
  },
  transactionsDetail:function(payload){
    return {type:'TRANSACTIONS_DETAIL',payload:payload}
  },
  konfirmasiBayar:function(payload){
    return {type:'KONFIRMASI_BAYAR',payload:payload}
  }
}
