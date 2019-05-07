
import "./setup";
import React from "react";
import ReactDOM from "react-dom";
import passwordForm from "../containers/PasswordForm"
import { shallow } from "enzyme";
import "./setup";

describe("<passwordForm/>", () => {
	const wrapper = shallow(<passwordForm/>);
	
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<passwordForm />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("didnt have a state", () => {
		expect(wrapper.state).not.toEqual(undefined);
	});

});


