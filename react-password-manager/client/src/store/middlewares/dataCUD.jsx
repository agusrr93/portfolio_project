import config from '../../config'

const { firebaseStore } = config

export default store => next => action => {
  if (action.type === 'manipulateData') {
    firebaseStore.collection('users').doc(action.id).update({
      data: action.payload
    })
  }
  next(action)  
}
