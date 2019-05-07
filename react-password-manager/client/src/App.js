import React, { Component } from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { Provider, connect } from 'react-redux'
import config from './config'
import jwt from 'jsonwebtoken'
import Store from './store'
import changeCurrentUser from './store/actions/changeCurrentUser'
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register'
import NavBar from './components/Navbar'
import AlreadyLogin from './components/PrivateRoute/AlreadyLogin'
import NotLogin from './components/PrivateRoute/NotLogin'
import './App.css';

const { jwtHash } = config

class App extends Component {

  componentDidMount() {
    let token = localStorage.getItem('token')
    this.isUserAlreadyLogin(token)
  }

  isUserAlreadyLogin = (token) => {
    if (token) {
      let decoded = jwt.verify(token, jwtHash)
      this.props.changeCurrentUser(decoded)
    }
  }

  render() {

    return (
      <div className="App">
        <Provider store={Store}>
          <Router>
            <div>
              <NavBar/>
              <Switch>
                <AlreadyLogin
                  path="/"
                  exact
                  component = {Home}
                />
                <NotLogin
                  path="/login"
                  component ={Login}
                  />
                <NotLogin
                  path="/register"
                  component ={Register}
                  />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    currentUser: state.currentUser.currentUser
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    changeCurrentUser: (obj) => dispatch(changeCurrentUser(obj)),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
