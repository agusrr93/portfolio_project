import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import config from '../../config'
import jwt from 'jsonwebtoken'
import FieldTitle from '../../components/FieldTitle'
import FieldForm from '../../components/FieldForm'
import changeCurrentUser from '../../store/actions/changeCurrentUser'

const { firebaseAuth, firebaseStore, jwtHash } = config

export class Login extends PureComponent {

  constructor (props) {
    super(props)

    this.state= {
      inputEmail: '',
      inputPassword: '',
      clicked: false
    }
  }
  
  changeStateInput = (val, property) => {
    this.setState({
      [property]: val
    })
  }

  submitLogin = () => {
    
    this.setState({
      clicked: true
    })

    let { inputEmail, inputPassword } = this.state
    firebaseAuth.signInWithEmailAndPassword(
      inputEmail, 
      inputPassword
    )
      .then(data => {
        return firebaseStore.collection('users').where('email', '==', data.user.email).get()
      })
      .then(data => {
        let payloadToStore = data.docs[0].data()
        let payload = {
          docId: data.docs[0].id,
          email: payloadToStore.email,
          uid: payloadToStore.uid
        }
        console.log(payload)
        this.props.changeCurrentUser(payload)
        let token = jwt.sign(payload, jwtHash)
        localStorage.setItem('token', token)
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({
          clicked: false
        })
        console.log(error.message)
      });
  }

  render() {
    let { inputEmail, inputPassword } = this.state

    return (
      <div className="ui grid centered">
        <div className="ui three wide column card form">
          <FieldTitle
            labelSize="h2"
            labelName="Login"
          />

          <FieldForm
            fieldName="Email :"
            typeInput="text"
            placeholder="Email"
            val={inputEmail}
            fn={(e) => this.changeStateInput(e, 'inputEmail')}
          />

          <FieldForm
            fieldName="Password :"
            typeInput="password"
            placeholder="Password"
            val={inputPassword}
            fn={(e) => this.changeStateInput(e, 'inputPassword')}
          />

          <div className="ui field">
            { 
              !this.state.clicked ?
              <button
                className="ui fluid blue mini button"
                onClick={() => this.submitLogin()}>
                Login
              </button>
              :
              <button
                className="ui disabled fluid blue mini loading button">
                Loading
              </button>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    currentUser: state.currentUser.currentUser
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    changeCurrentUser: (obj) => dispatch(changeCurrentUser(obj))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
