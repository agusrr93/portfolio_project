import React, { Component } from "react";
import { Checkbox } from "carbon-components-react";
import "carbon-components/css/carbon-components.min.css";

export default class PasswordWidgetItem extends Component {
	isPatternMatch = () =>{
		return this.props.regex.test(this.props.stringToTest)
	}

	render() {
		return (
			<div>
				<Checkbox  checked={this.isPatternMatch()} labelText={this.props.label} id={this.props.id}></Checkbox>
			</div>
		);
	}
}