import React, { Component, Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

class AlreadyLogin extends Component {

  whereShouldUserGo = () => {
    let currentUser = this.props.currentUser
    let { component: Component, ...rest } = this.props

    if (currentUser) {
      return (
        <Route
          {...rest}
          render = {(props) => <Component {...props}/>}>
        </Route>
      )
    } else {
      return (
        <Route
          {...rest}
          render = {(props) => <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />}>
        </Route>
      )
    }
  }
  
  render = () => {
    return (
      <Fragment>
        {this.whereShouldUserGo()}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    currentUser: state.currentUser.currentUser,
  })
}

export default connect(mapStateToProps)(AlreadyLogin)
