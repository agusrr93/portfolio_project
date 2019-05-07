import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import config from '../../config'
import { Link } from "react-router-dom"
import changeCurrentUser from '../../store/actions/changeCurrentUser'

const { firebaseAuth } = config

class NavBar extends PureComponent {

  logout() {
    firebaseAuth.signOut()
      .then(data => {
        this.props.changeCurrentUser(null)
        localStorage.removeItem('token')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    return (
      <div className="ui grid segment">
        <div className="ui three wide column">
          <Link to={'/'}>
            <h2>React PWD Manager</h2>
          </Link>
        </div>
        <div className="ui thirteen wide column">
          {
            this.props.currentUser ?
              <button className="ui right floated mini blue button" onClick={() => this.logout()}>
                logout
              </button>
            :
              <div>
                <Link to={'/login'}>
                  <button className="ui blue right floated mini button">
                    login
                  </button>
                </Link>
                <Link to={'/register'}>
                  <button className="ui right floated mini button">
                    register
                  </button>
                </Link>
              </div>
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
