import React from "react";
import MainPage from "../containers/MainPage";
import { shallow } from "enzyme";
import "./setup";
import store from "../js/store"

describe("<MainPage/>", () => {
	const wrapper = shallow(<MainPage store={store}/>);
	
	it("isLogin ", () => {
        store.dispatch({
            type: 'LOGIN',
            payload: 'hfihfiudshfiuhsdf'
        })

        expect(wrapper.props().isLoggedIn).toEqual(true);
	});

    it("isLogout ", () => {
        expect(store.dispatch({
            type: 'LOGOUT',
        }))

        expect(wrapper.props().isLoggedIn).toEqual(false);
    });
    
	it("didnt have a state", () => {
		expect(wrapper.state).not.toEqual(undefined);
	});

});

