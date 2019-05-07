import reducer from '../js/reducers';
import * as actions from '../js/actions/passwords/createPasswords';
import * as delactions from '../js/actions/passwords/deletePasswords';
import * as logactions from '../js/actions/userlogin/index'
import * as editactions from '../js/actions/passwords/updatePasswords';
describe('post reducer', () => {

  it('should handle Error While GET_Error_Action', () => {
    expect(reducer({},actions.createPasswordFailed("error bro")).passwords.error).toEqual("error bro");
  });

  it('should GET data while update Success', () => {
		let payload= {
            username:'dani',
            link:'www.github.com/2',
            passwords:'01@erAr',
        }
    
    expect(reducer({}, actions.createPasswordSuccess(payload)).passwords.data).toEqual(payload);
  });

  it('it should show remaining data if deleted action success', () => {
    let remainingData= {
        username:'dani',
        link:'www.github.com/2',
        passwords:'01@erAr',
    }
    expect(reducer({}, delactions.deletePasswordSuccess(remainingData)).passwords.data).toEqual(remainingData);
  });

  it('should GET data while update Success', () => {
		let payload= {
            username:'dani',
            link:'www.github.com/2',
            passwords:'01@erAr',
        }
    expect(reducer({}, actions.createPasswordSuccess(payload)).passwords.data).toEqual(payload);
  });

  it('should receive error if delete failed', () => {
    expect(reducer({},delactions.deletePasswordFailed("error bro")).passwords.error).toEqual("error bro");
  });

  it('must update user initial state while user login', () => {
        let payload= {
            "isLoggedIn":true,
            "uid": "user1"
        }
        expect(reducer({}, logactions.login('user1')).login).toEqual(payload);
  });

  it('must change user initial state while user logout', () => {
    let payload= {
        "isLoggedIn":false,
        "uid": ""
    }
    expect(reducer({}, logactions.logout('')).login).toEqual(payload);
});

    it('must change data while user edit data', () => {
    let payload= {
        username:'dani',
        link:'www.github.com/2',
        passwords:'01@erAr'
    }
    expect(reducer({}, editactions.updatePasswordSuccess(payload)).passwords.data).toEqual(payload);
    });

});
