import React, { Component } from 'react'
import { connect } from 'react-redux'
import validatorInput from './validatorInput'
import config from '../../config'
import changeCurrentUser from '../../store/actions/changeCurrentUser'
import FieldForm from '../../components/FieldForm'
import FieldTitle from '../../components/FieldTitle';

const { firebaseAuth, firebaseStore } = config

export class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      inputFname: '',
      inputLname: '',
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

  submitInput = () => {
    this.setState({
      clicked: true
    })

    let { inputFname, inputLname, inputEmail, inputPassword } = this.state

    validatorInput(this.state)
      .then(data => {
        return firebaseAuth.createUserWithEmailAndPassword(
          inputEmail,
          inputPassword
        )
      })
      .then( data => {
        return firebaseStore.collection("users").add({
          fname: inputFname,
          lname: inputLname,
          email: inputEmail,
          uid: data.user.uid,
          data: []
        })
      })
      .then(data => {
        let { history } = this.props
        history.push('/login')
      })
      .catch(err => {
        console.log(err)
        this.setState({
          clicked: false
        })
      })
  }

  render() {

    let { inputFname, inputLname, inputEmail, inputPassword } = this.state

    return (
      <div className="ui grid centered">
        <div className="ui six wide column">
          <div className="ui fluid card form" style={{ padding: '20px' }}>

            <FieldTitle
              labelName="Register"
              labelSize="h2"
            />
            <div className="ui two fields">

              <FieldForm
                fieldName="First name :"
                typeInput="text"
                placeholder="First name"
                val={inputFname}
                fn={(e) => this.changeStateInput(e,'inputFname')}
              />

              <FieldForm
                fieldName="Last name :"
                typeInput="text"
                placeholder="Last name"
                val={inputLname}
                fn={(e) => this.changeStateInput(e,'inputLname')}
              />

            </div>
            <div className="ui two fields">

              <FieldForm
                fieldName="Email :"
                typeInput="text"
                placeholder="Email"
                val={inputEmail}
                fn={(e) => this.changeStateInput(e,'inputEmail')}
              />

              <FieldForm
                fieldName="Password :"
                typeInput="password"
                placeholder="Password"
                val={inputPassword}
                fn={(e) => this.changeStateInput(e,'inputPassword')}
              />
            </div>
            <div className="ui field">
              {
                this.state.clicked ?
                  <button
                    className="ui mini disabled fluid blue loading button">
                    Loading
                  </button>
                :
                  <button
                    className="ui mini fluid blue button"
                    onClick={this.submitInput}>
                    Submit
                  </button>
              }

            </div>
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
    changeCurrentUser: () => dispatch(changeCurrentUser())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
