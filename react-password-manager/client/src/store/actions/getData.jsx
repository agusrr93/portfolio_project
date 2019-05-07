import config from '../../config'

const { firebaseStore } = config

export default function (id) {
  return function (dispatch) {
    firebaseStore.collection('users').doc(id)
      .onSnapshot( doc => {
        dispatch({ type: 'get/userData', payload: doc.data().data })
      })
  }
}
