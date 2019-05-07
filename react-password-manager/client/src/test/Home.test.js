import React from 'react'
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Home from '../page/Home'
import Store from '../store'
import config from '../config'

import ValidationCaseChanger from '../store/actions/validatorCaseChanger'
import ChangeInputData from '../store/actions/changeInputData'
import changeSelectedData from '../store/actions/changeSelectedData'

import * as action from '../page/Home'
import changeShowAction from '../store/actions/changeShowAction';
import changeInputData from '../store/actions/changeInputData';

const { jwtHash } = config

configure({ adapter: new Adapter() });

describe('> testing <Home /> Component', () => {

  const decodedFormat = {
    docId: "Uk0eYnHtXfNB5EctRrXx", 
    email: "andri@mail.com", 
    uid: "qsqxJN2FM0b6M3KwCsRPMU1Zxa53"
  }

  const wrapper = shallow(<Home store={Store}/>)

  describe('is Home component exist', () => {
    it('is Home component exist', () => {
      expect(wrapper.exists('Home')).toBeTruthy()
    })
    it('is Home rendered more than once', () => {
      expect(wrapper).toHaveLength(1)
    })
  })

  describe('showAction User', () => {

    it('showAction should be null on init', () => {
      expect(wrapper.props().showAction).toEqual(null)
    })

    it('showAction should have value create', () => {
      Store.dispatch(changeShowAction('create'))
      expect(wrapper.props().showAction).toEqual('create')
    })

    it('showAction should have value update', () => {
      Store.dispatch({ type: 'put/showAction', payload: 'update' })
      expect(wrapper.props().showAction).toEqual('update')
    })

    it('showAction should have value null', () => {
      Store.dispatch(changeShowAction(null))
      expect(wrapper.props().showAction).toEqual(null)
    })
  })

  describe('User input props', () => {
    describe('props Url site', () => {
      it('props Url site have empty string when init', () => {
        expect(wrapper.props().inputData.inputUrlSite).toEqual('')
      })

      it(`changing value Url site with value 'Testing'`, () => {
        Store.dispatch(ChangeInputData('Testing', 'inputUrlSite'))
        expect(wrapper.props().inputData.inputUrlSite).toEqual('Testing')
      })
    })

    describe('props Username and email', () => {
      it('props Username and email have empty string when init', () => {
        expect(wrapper.props().inputData.inputUsernameOrEmail).toEqual('')
      })

      it(`changing value inputUsernameOrEmail with value 'Testing'`, () => {
        Store.dispatch({type: 'put/inputData', payload: 'Testing', property: 'inputUsernameOrEmail' })
        expect(wrapper.props().inputData.inputUsernameOrEmail).toEqual('Testing')
      })
    })

    describe('props inputPassword', () => {
      it('props inputPassword have empty string when init', () => {
        expect(wrapper.props().inputData.inputPassword).toEqual('')
      })

      it(`changing value inputUsernameOrEmail with value 'Testing'`, () => {
        Store.dispatch({type: 'put/inputData', payload: 'Testing', property: 'inputPassword' })
        expect(wrapper.props().inputData.inputPassword).toEqual('Testing')
      })
    })

    describe('reset all input user to empty string', () => {
      it('All props input data will be have value empty string', () => {
        Store.dispatch({type: 'delete/inputData/all'})
        expect(wrapper.props().inputData.inputPassword).toEqual('')
        expect(wrapper.props().inputData.inputUsernameOrEmail).toEqual('')
        expect(wrapper.props().inputData.inputUrlSite).toEqual('')
      })
    })
  })

  describe('props selected Data', () => {

    let formatSelectedData = {
      inputUrlSite: 'Testing',
      inputUsernameOrEmail: 'Testing',
      inputPassword: 'Testing'
    }

    it('selectedData should be null on init', () => {
      expect(wrapper.props().selectedData).toEqual(null)
    })

    it('showAction should have value create', () => {
      Store.dispatch(changeSelectedData(formatSelectedData))
      expect(wrapper.props().selectedData).toEqual(formatSelectedData)
    })
  })

  describe('props createFormatData', () => {
    
    let inputUrlSite = 'Testing',
        inputUsernameOrEmail = 'Testing',
        inputPassword = 'Testing'
    
    it('it should return an Object with addition createdAt and updatedAt', () => {
      let res = wrapper.props().createFormatData(inputUrlSite, inputUsernameOrEmail, inputPassword)
      expect(res).toHaveProperty('Url site', 'Testing')
      expect(res).toHaveProperty('Username or email', 'Testing')
      expect(res).toHaveProperty('Password', 'Testing')
      expect(res).toHaveProperty('Created At')
      expect(res).toHaveProperty('Update At')
    })
  })

  describe('Validation input password', () => {

    it('all value props validation input should be false when init', () => {
      expect(wrapper.props().validationInput).toHaveProperty('upperCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('lowerCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('specialCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('numberCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('lengthCase', false)
    })

    it('upperCase value props validation input should be true if input length greater than 5', () => {
      Store.dispatch(changeInputData('11111','inputPassword'))
      expect(wrapper.props().validationInput).toHaveProperty('lengthCase', true)
    })

    it('upperCase value props validation input should be true if input have upperCase letter', () => {
      Store.dispatch({type: 'put/validation', payload:'1111A'})
      expect(wrapper.props().validationInput).toHaveProperty('upperCase', true)
    })

    it('lowerCase value props validation input should be true if input have lowerCase letter', () => {
      Store.dispatch({type: 'put/validation', payload:'1111a'})
      expect(wrapper.props().validationInput).toHaveProperty('lowerCase', true)
    })

    it('specialCase value props validation input should be true if input have specialCase letter', () => {
      Store.dispatch({type: 'put/validation', payload:'1111!'})
      expect(wrapper.props().validationInput).toHaveProperty('specialCase', true)
    })

    it('numberCase value props validation input should be true if input have numberCase letter', () => {
      Store.dispatch({type: 'put/validation', payload:'1111!'})
      expect(wrapper.props().validationInput).toHaveProperty('numberCase', true)
    })

    it('all value props validation input should be true when input 1aQ!wd$', () => {
      Store.dispatch({type: 'put/validation', payload:'1aQ!wd$'})

      expect(wrapper.props().validationInput).toHaveProperty('upperCase', true)
      expect(wrapper.props().validationInput).toHaveProperty('lowerCase', true)
      expect(wrapper.props().validationInput).toHaveProperty('specialCase', true)
      expect(wrapper.props().validationInput).toHaveProperty('numberCase', true)
      expect(wrapper.props().validationInput).toHaveProperty('lengthCase', true)
    })

    it('all value props validation input should be true when input 1aQ!wd$', () => {
      Store.dispatch({type: 'put/validation', payload:'1aQ!wd$'})
      Store.dispatch(changeInputData({
        inputPassword: ''
      },'resetAll'))

      expect(wrapper.props().validationInput).toHaveProperty('upperCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('lowerCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('specialCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('numberCase', false)
      expect(wrapper.props().validationInput).toHaveProperty('lengthCase', false)
    })

    it('lengthCase value props validation input should be false if input length smaller than 5', () => {
      Store.dispatch({type: 'put/validation', payload:'111'})
      expect(wrapper.props().validationInput).toHaveProperty('lengthCase', false)
    })

    it('numberCase value props validation input should be false if input dont have number on it', () => {
      Store.dispatch({type: 'put/validation', payload:'asdas'})
      expect(wrapper.props().validationInput).toHaveProperty('numberCase', false)
    })

  })

  describe('User Data Crud', () => {
    
    it('should be empty array when ini app', () => {
      expect(wrapper.props().userData).toEqual([])
    })

    it('should be have length 1 and have an dataUser', () => {
      let datauser = {
        inputUrlSite: 'google.com',
        inputUsernameOrEmail: 'testing',
        inputPassword: 'Testing'
      }

      let newData = wrapper.props().createFormatData(datauser.inputUrlSite, datauser.inputUsernameOrEmail, datauser.inputPassword)

      Store.dispatch({ type: 'get/userData', payload: newData })
      expect(wrapper.props().userData).toHaveProperty('Url site', 'google.com')
      expect(wrapper.props().userData).toHaveProperty('Username or email', 'testing')
      expect(wrapper.props().userData).toHaveProperty('Password', 'Testing')
    })

  })
  
  
})

