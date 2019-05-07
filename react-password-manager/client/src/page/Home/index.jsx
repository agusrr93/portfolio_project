import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import FieldTitle from '../../components/FieldTitle'
import FieldForm from '../../components/FieldForm'
import CUDData from '../../store/actions/CUDData'
import changeInputData from '../../store/actions/changeInputData'
import changeShowAction from '../../store/actions/changeShowAction'
import changeSelectedData from '../../store/actions/changeSelectedData'
import validatorCaseChanger from '../../store/actions/validatorCaseChanger'
import getData from '../../store/actions/getData'
import THead from './components/THead'
import TBody from './components/TBody'
import FieldNotifValidator from './components/FieldNotifValidator'

export class Home extends Component {

  attrNotifPassMaker = (property) => {
    if (this.props.validationInput[property]) {
      return 'check green'
    } else {
      return 'x red'
    }
  }

  attrButtonSubmitMaker = () => {
    let { upperCase, lowerCase, specialCase, numberCase, lengthCase } = this.props.validationInput

    if (upperCase && lowerCase && specialCase && numberCase && lengthCase) {
      return 'ui mini right floated blue button'
    } else {
      return 'ui mini right floated blue disabled button'
    }
  }

  componentDidMount = () => {
    this.props.getData(this.props.currentUser.docId)
  }

  syncInputAndForm = (valObj, index) => {

    let { changeShowAction, changeInputData, changeSelectedData } = this.props

    let newData = {
      inputUrlSite: valObj['Url site'],
      inputUsernameOrEmail: valObj['Username or email'],
      inputPassword: valObj['Password'],  
    }
    
    changeShowAction('edit')
    changeInputData(newData, 'resetAll')
    changeSelectedData(index)
  }

  createFormatData = () => {
    let { inputUrlSite, inputUsernameOrEmail, inputPassword } = this.props.inputData

    let formatNewData = {
      'Url site': inputUrlSite,
      'Username or email': inputUsernameOrEmail,
      'Password': inputPassword,
      'Created At': Date(),
      'Update At': Date()
    }

    return formatNewData
  }

  createNewArrayData = (task, params) => {

    let newData = this.props.userData.slice()

    switch (task) {
      case 'add':
        newData.push(this.createFormatData())
        break;

      case 'edit':
        let newDataUpdated = this.createFormatData()
        let createdAt = newData[params]['Created At']

        newDataUpdated['Created At'] = createdAt
        newData[params] = newDataUpdated
        break;

      case 'del':
        let payload = []
        
        newData.forEach((dataList, i) => {
          if (params !== i) {
            payload.push(dataList)
          }
        })
        newData = payload
        break;
    
      default:
        break;
    }
    
    return newData
  }

  render() {
    let { userData, currentUser, changeInputData, showAction, changeShowAction, CUDData, selectedData } = this.props
    let { inputUrlSite, inputUsernameOrEmail, inputPassword, } = this.props.inputData

    return (
      <div className="ui grid centered">
        <div className="ui ten wide column">
          <button
            className="ui mini blue button"
            onClick={() => changeShowAction('create')}>
            <i className="ui plus icon"></i>
            create new
          </button>
          {
            showAction ? 
              <div className="ui fluid card form" style={{ padding: '20px' }}>
                {
                  showAction === 'create' ?
                    <FieldTitle
                      labelName="Create"
                      labelSize="h2"
                    />
                  :
                    <FieldTitle
                      labelName="Update"
                      labelSize="h2"
                    />
                }
                <div className="ui three fields">

                  <FieldForm
                    fieldName="Url site :" 
                    typeInput="text" 
                    placeholder="Url site" 
                    fn={(e) => changeInputData(e,'inputUrlSite')} 
                    val={inputUrlSite}
                  />

                  <FieldForm 
                    fieldName="Username or email :" 
                    typeInput="text" 
                    placeholder="Username or email" 
                    fn={(e) => changeInputData(e,'inputUsernameOrEmail')} 
                    val={inputUsernameOrEmail}
                  />

                  <FieldForm 
                    fieldName="Password :" 
                    typeInput="text" 
                    placeholder="Password" 
                    fn={(e) => changeInputData(e,'inputPassword')} 
                    val={inputPassword}
                  />

                </div>
                  <div className="ui two fields">
                    <div className="ui field">
                      <FieldNotifValidator iconColor={this.attrNotifPassMaker('upperCase')} message="Password must have one uppercase character"/>
                      <FieldNotifValidator iconColor={this.attrNotifPassMaker('lowerCase')} message="Password must have one lowercase character"/>
                      <FieldNotifValidator iconColor={this.attrNotifPassMaker('specialCase')} message="Password must have one special character"/>
                      <FieldNotifValidator iconColor={this.attrNotifPassMaker('numberCase')} message="Password must have one number"/>
                      <FieldNotifValidator iconColor={this.attrNotifPassMaker('lengthCase')} message="Password must have a length of more than 5 characters"/>
                    </div>
                    <div className="ui field">
                      {
                        showAction === 'create' ?
                          <button
                            className={this.attrButtonSubmitMaker()}
                            onClick={() => {CUDData(currentUser.docId, this.createNewArrayData('add'))}}>
                            Create
                          </button>
                        :
                          <button
                            className={this.attrButtonSubmitMaker()}
                            onClick={() => {CUDData(currentUser.docId, this.createNewArrayData('edit', selectedData))}}>
                            Update
                          </button>
                      }
                      <button
                        className="ui mini right floated red button"
                        onClick={() => changeShowAction(null)}>
                        Cancle
                      </button>
                  </div>
                </div>
              </div>
            :
              <div style={ { marginBottom: '20px' } }></div>
          }
          <FieldTitle
            labelName="Data list"
            labelSize="h2"/>

          <table className="ui celled table">

            <THead list={[
              'No', 'Url Site', 'Username or email', 'Password', 'Created At', 'Updated At', 'Actions']}/>
            {
              userData &&
                <TBody
                  list={userData}
                  fnDel={(data) => CUDData(currentUser.docId, this.createNewArrayData('del', data), 'del')}
                  fnEdit={(data, i) => this.syncInputAndForm(data, i)}
                />
            }
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    currentUser: state.currentUser.currentUser,
    userData: state.userData.userData,
    validationInput: state.validationInput,
    inputData: state.inputData,
    showAction: state.showAction.showAction,
    selectedData: state.selectedData.selectedData,
    createFormatData: state.createFormatData.createFormatData
  })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  CUDData,
  getData,
  changeInputData,
  changeShowAction,
  changeSelectedData,
  validatorCaseChanger
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
