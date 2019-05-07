import React, { Component } from 'react';
import { MDBAlert } from 'mdbreact';
export default class Message extends Component {
	render() {
		return <MDBAlert color={this.props.color}>{this.props.msg}</MDBAlert>;
	}
}
