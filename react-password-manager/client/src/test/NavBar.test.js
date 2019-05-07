import React from 'react'
import { mount, shallow, configure, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AlreadyLogin from '../components/PrivateRoute/AlreadyLogin'
import Store from '../store'
import NavBar from '../components/Navbar'
import JWT from 'jsonwebtoken'
import config from '../config'
import changeCurrentUser from '../store/reducer/currentUser'
import { Route, MemoryRouter, Provider, Link } from 'react-router-dom';
import { wrap } from 'module';
import { link } from 'fs';

const { jwtHash } = config

configure({ adapter: new Adapter() });

describe('> testing  <NavBar /> Component', () => {
  
  describe('should have props', function () {
    const wrapper = shallow(<NavBar store={Store} />)
    
    it ('props currentUser', () => {
      expect(wrapper.props()).toHaveProperty('currentUser', null)
    })

    it ('props changeCurrentUser', () => {
      expect(wrapper.props()).toHaveProperty('changeCurrentUser')
    })

  })

  describe('currentUser equal to null if logout method called', () => {
    const wrapper = shallow(<NavBar store={Store} />)
    const decodedFormat = {
      docId: "Uk0eYnHtXfNB5EctRrXx", 
      email: "andri@mail.com", 
      uid: "qsqxJN2FM0b6M3KwCsRPMU1Zxa53"
    }

    it('simulation user logout', async () => {
      wrapper.props().changeCurrentUser(decodedFormat) //login

      expect(wrapper.props().currentUser).toHaveProperty('docId', decodedFormat.docId)      

      await wrapper.dive().instance().logout() //logout

      expect(wrapper.props()).toHaveProperty('currentUser', null)
    })
  })

})

