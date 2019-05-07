import React, { Component } from "react";
import PasswordWidgetItem from "./PasswordWidgetItem";
import { FormGroup } from "carbon-components-react";

export default class PasswordWidget extends Component {
	render() {
		return (
			<div>
				<FormGroup legendText="Password Strength">
					{this.props.passwordPattern.map((x, i) => {
						return <PasswordWidgetItem
							key={i}
							regex={x.pattern}
							label={x.direction}
							id={i.toString()}
							stringToTest={this.props.stringToTest}
						/>;
					})}
				</FormGroup>
			</div>
		);
	}
}
