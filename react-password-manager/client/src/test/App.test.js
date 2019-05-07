import React from 'react'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../App'
import Store from '../store'
import JWT from 'jsonwebtoken'
import config from '../config'
import { Route, MemoryRouter } from 'react-router-dom';

const { jwtHash } = config

configure({ adapter: new Adapter() });

describe('> testing <App /> Component', () => {

  const decodedFormat = {
    docId: "Uk0eYnHtXfNB5EctRrXx", 
    email: "andri@mail.com", 
    uid: "qsqxJN2FM0b6M3KwCsRPMU1Zxa53"
  }

  const WrapperApp = shallow(<App store={Store}/>)

  beforeEach = (() => {
    WrapperApp = shallow(<App store={Store}/>)
  }) 

  describe('is App component exist', () => {
    it('is App component exist', () => {
      expect(WrapperApp.exists('App')).toBeTruthy()
    })
    it('is App rendered more than once', () => {
      expect(WrapperApp).toHaveLength(1)
    })
  })

  describe('Check all Props', function () {
    const WrapperApps = shallow(<App store={Store}/>)

    it('is Props changeCurrentUser exist', () => {
      expect(WrapperApps.props()).toHaveProperty('changeCurrentUser')
    })

    it('is Props currentUser exist', () => {
      expect(WrapperApps.props()).toHaveProperty('currentUser')
    })
  })

  describe(`if user already login and accessing path '/'`, function () {
    const oldProps = WrapperApp.props()

    it(`is Props currentUser is null when user without login accessing path '/'`, () => {
      expect(oldProps).toHaveProperty('currentUser', null)
    })

    let token = JWT.sign(decodedFormat, jwtHash)

    WrapperApp.dive().instance().isUserAlreadyLogin(token)
    const newProps = WrapperApp.props().currentUser

    it(`is Props currentUser changed when user access path '/'`, () => {
      expect(newProps).toHaveProperty('docId', decodedFormat.docId)
      expect(newProps).toHaveProperty('email', decodedFormat.email)
      expect(newProps).toHaveProperty('uid', decodedFormat.uid)
    })
  })
})

