import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { shallow } from "enzyme";
import "./setup";
import { ADD_PASSWORD } from "../js/constants/passwords";

describe("<App/>", () => {
	const wrapper = shallow(<App />);
	
	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<App />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it("didnt have a state", () => {
		expect(wrapper.state).not.toEqual(undefined);
	});

});


