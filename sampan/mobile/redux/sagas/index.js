import { put, takeLatest,select, all,call,delay} from 'redux-saga/effects';
import axios from 'axios'

function getGoods(){
  return axios.get('https://sampanhorev1.herokuapp.com/api/v1/item/all')
}
function getProfile(config){
  return axios.get('https://sampanhorev1.herokuapp.com/api/v1/user',config)
}
function loginAPI(payload){
  return axios.post('https://sampanhorev1.herokuapp.com/api/v1/public/login',payload)
}
function getDetail(payload){
  return axios.get(`https://sampanhorev1.herokuapp.com/api/v1/item/${payload}/detail`)
}

function addToCart(config){
  return axios.post(`https://sampanhorev1.herokuapp.com/api/v1/cart`,config.itemId,config.config)
}

function getSlider(){
  return axios.get('https://sampanhorev1.herokuapp.com/api/v1/slider/all')
}

function getCart(config){
  return axios.get(`https://sampanhorev1.herokuapp.com/api/v1/cart`,config)
}

function getCheckout(config){
  return axios.post(`https://sampanhorev1.herokuapp.com/api/v1/transaction`,config.quantity,config.config)
}

function getCategory(){
  return axios.get('https://sampanhorev1.herokuapp.com/api/v1/category')
}

function setWishlistAPI(config){
  return axios.post('https://sampanhorev1.herokuapp.com/api/v1/wishlist',config.item,config.config)
}

function deleteItemAPI(config){
   return axios.delete(`https://sampanhorev1.herokuapp.com/api/v1/item/${config.id}/delete`,config.config)
}

function confirmOrderAPI(config){
   return axios({ method: 'POST', url: 'https://sampanhorev1.herokuapp.com/api/v1/transaction/checkout',headers: {authorization: config.headers.authorization}})
}

function userTransactionAPI(config){
    return axios.get(`https://sampanhorev1.herokuapp.com/api/v1/user/showorderuser`,config)
}

function mitraTransactionAPI(config){
    return axios.get(`https://sampanhorev1.herokuapp.com/api/v1/user/showorder`,config)
}

function konfirmasiBayarAPI(config){
    return axios.put('https://sampanhorev1.herokuapp.com/api/v1/transaction',config)
}

function* fetchPeople() {
  const getToken = (state) =>state.auth
  const token = yield select(getToken)
  const data = yield call(getDog)
  if (data)
    yield put({ type: "PEOPLE_RECEIVED", payload: data.data.message})
  else
    yield put({ type: 'PEOPLE_REQUEST_FAILED',payload:'error'})
}

function* fetchGoods() {
    try{
          const data = yield call(getGoods)
          yield put({ type: "GOODS_RECEIVED", payload: data.data.data.docs})
    }
    catch{
          yield put({ type: "GOODS_REQUEST_FAILED", payload:'error'})
    }
}

function* authAPI(content){
  try{
      const data = yield call(loginAPI,content.payload)
      yield put({ type: "LOGIN_SUCCESS", payload: data.data.token})

      let config = {
          headers: {
            authorization:data.data.token,
          }
      }

      const hasil=yield call(getProfile,config)
      const payloads={
        "verify":hasil.data.profile.verify,
        "name":hasil.data.profile.local.username,
        "email":hasil.data.profile.local.email
      }

      yield put({ type: "GET_PROFILE_SUCCESS", payload: payloads})

  }
  catch{
     yield put({ type: 'LOGIN_FAILED',payload:'error'})
  }
}

function* detailAPI(content){
    try{
      const data=yield call(getDetail,content.payload)

      yield put({ type: "GET_DETAIL_SUCCESS", payload: data.data.data})
    }
    catch{
      yield put({ type: "GET_DETAIL_FAILED", payload: 'error'})
    }
}

function* setDetailLoading(){
   yield put({type:"SET_DETAIL_LOADING"})
}

function* userCart(content){
  let config = {
      headers: {
        authorization:content.payload.token,
      }
  }

  let itemId={
    itemId:content.payload.itemId
  }

  let configuration={
    config:config,
    itemId:itemId
  }

  try{
      const data = yield call(addToCart,configuration)
      yield put({ type: "ADD_TO_CART_SUCCESS"})
      yield delay(2000);
      yield put({ type: "CLEAR_MESSAGE"})
  }catch{
      yield put({ type: "ADD_TO_CART_FAILED"})
  }
}

function* deleteItemAction(content){
    let config = {
        headers: {
          authorization:content.payload.token,
        }
    }

    let configure={
      config:config,
      id:content.payload.id
    }
    try{
        const data = yield call(deleteItemAPI,configure)
        console.log(data)
    }
    catch{
        console.log('err')
    }
}

function* getCartAction(content){
      let config = {
          headers: {
            authorization:content.payload,
          }
      }

      try{
        const data = yield call(getCart,config)

        let form=[]
        data.data.data.forEach(data=>{
          form.push(data.qty)
        })

        let payload={
          cart:data.data.data,
          form:form
        }
        yield put({type: "GET_CART_SUCCESS", payload:payload })
      }
      catch{
        yield put({type: "GET_CART_FAILED"})
      }
}

function* fetchSlider(){
  try{
      const data = yield call(getSlider)
      yield put({ type: "GET_SLIDER_SUCCESS", payload:data.data.data})
      yield delay(2000);
      yield put({type:"CLEAR_MESSAGE"})
  }
  catch{
      yield put({ type: "GET_SLIDER_FAILED"})
  }
}
function* getCheckoutAction(content){
  let config = {
      headers: {
        authorization:content.payload.token,
      }
  }

  let Form={
      quantity:JSON.stringify(content.payload.form)
  }

  let configuration={
    config:config,
    quantity:Form
  }

  try{
      const data = yield call(getCheckout,configuration)
      yield put({ type: "GET_CHECKOUT_SUCCESS", payload:data.data.data})
  }
  catch{
      yield put({ type: "GET_CHECKOUT_FAILED"})
  }
}

function* fetchCategory(){
  try{
      const data = yield call(getCategory)
      yield put({ type: "GET_CATEGORY_SUCCESS", payload:data.data})
  }
  catch{
      yield put({ type: "GET_CATEGORY_FAILED"})
  }
}

function* setWishlist(content){
  let config = {
      headers: {
        authorization:content.payload.token
      }
  }

  let payload={
    config:config,
    item:content.payload.itemId
  }

  try{
      const data = yield call(setWishlistAPI,payload)
      yield put({type:"SET_WISHLIST_SUCCESS"})
  }
  catch{
      yield put({type:"SET_WISHLIST_FAILED"})
  }
}

function* confirmOrderActions(content){
  let config = {
      headers:{
        authorization:content.payload,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
  }

  try{
      const data = yield call(confirmOrderAPI,config)
      yield put({type:"CONFIRM_ORDER_SUCCESS"})
  }
  catch{
      yield put({type:"CONFIRM_ORDER_FAILED"})
  }
}

function* userTransactionActions(content){
  let config = {
      headers:{
        authorization:content.payload
      }
  }

  try{
      const data = yield call(userTransactionAPI,config)
      yield put({type:"USER_TRANSACTION_SUCCESS",payload:data.data.data.data})
  }
  catch{
      yield put({type:"USER_TRANSACTION_FAILED"})
  }
}

function* mitraTransactionActions(content){
  let config = {
      headers:{
        authorization:content.payload
      }
  }

  try{
      const data = yield call(mitraTransactionAPI,config)
      yield put({type:"MITRA_TRANSACTION_SUCCESS",payload:data.data.data.data})
  }
  catch{
      yield put({type:"MITRA_TRANSACTION_FAILED"})
  }
}

function* transactionDetailActions(content){
  let config = {
    headers:{
      authorization:content.payload.token
    }
  }

  let configuration={
     config:config,
     tid:content.payload.tid
  }

  try{
      const data = yield call(transactionDetailAPI,configuration)
      console.log('data detail',data)
      yield put({type:"TRANSACTION_DETAIL_SUCCESS"})
  }
  catch{
      yield put({type:"TRANSACTION_DETAIL_FAILED"})
  }
}

function konfirmasiBayarActions(content){
  let config = {
    headers:{
      authorization:content.payload.token
    }
  }

  let configuration={
      config:config,
      body:content.payload.body
  }

  console.log('dari config konfirmasi',configuration)
  /*try{
      const data = yield call(konfirmasiBayarAPI,configuration)
      console.log('data konfirmasi',data)
      yield put({type:"KONFIRMASI_BAYAR_SUCCESS"})
  }
  catch{
      yield put({type:"KONFIRMASI_BAYAR_FAILED"})
  }*/

}

function* actionWatcher() {
     yield takeLatest('GET_PEOPLE', fetchPeople);
     yield takeLatest('GET_GOODS', fetchGoods);
     yield takeLatest('AUTH_PEOPLE', authAPI);
     yield takeLatest('FETCH_DETAIL', detailAPI);
     yield takeLatest('SET_LOADING', setDetailLoading);
     yield takeLatest('ADD_TO_CART',userCart);
     yield takeLatest('GET_CART',getCartAction)
     yield takeLatest('GET_CHECKOUT',getCheckoutAction)
     yield takeLatest('GET_SLIDER',fetchSlider)
     yield takeLatest('GET_CATEGORY',fetchCategory)
     yield takeLatest('SET_WISHLIST',setWishlist)
     yield takeLatest('GET_CART',getCartAction)
     yield takeLatest('DELETE_ITEM',deleteItemAction)
     yield takeLatest('CONFIRM_ORDER',confirmOrderActions)
     yield takeLatest('USER_TRANSACTION',userTransactionActions)
     yield takeLatest('MITRA_TRANSACTION',mitraTransactionActions)
     yield takeLatest('TRANSACTIONS_DETAIL',transactionDetailActions)
     yield takeLatest('KONFIRMASI_BAYAR',konfirmasiBayarActions)
}


export default function* rootSaga() {
   yield all([
     actionWatcher(),
   ]);
}
