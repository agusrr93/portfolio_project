import React from 'react'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AlreadyLogin from '../components/PrivateRoute/AlreadyLogin'
import Store from '../store'
import App from '../App'
import JWT from 'jsonwebtoken'
import config from '../config'
import { Route, MemoryRouter } from 'react-router-dom';

const { jwtHash } = config

configure({ adapter: new Adapter() });

describe('> PrivateRoute AlreadyLogin  <App /> Component', () => {
  
  const warpper = shallow(<AlreadyLogin store={Store}/>)

  describe('component should be exist', () => {
    it('component shold have props currentUser', () => {
      expect(warpper.exists('AlreadyLogin')).toBeTruthy()
    })
  })

  describe('it should have props currentUser', () => {
    it('component shold have props currentUser', () => {
      expect(warpper.props()).toHaveProperty('currentUser', null)
    })
  })

  // describe(`it should redirect user to login if user accessing path '/' without login first`, () => {
  //   it('component shold have props currentUser', () => {
  //     const wrapperApp = shallow(
  //       <MemoryRouter initialEntries={['/']}>
  //         <App store={Store}/>
  //       </MemoryRouter>
  //     );
  //     expect(wrapperApp.props()).toHaveProperty('currentUser', null)
  //     expect(wrapperApp.props()).toBe("/")
  //   })
  // })

})

