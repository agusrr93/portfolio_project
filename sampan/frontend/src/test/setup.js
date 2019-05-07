import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const { Builder } = require('selenium-webdriver');
require('geckodriver');

exports.serverUri = 'http://localhost:3000';
exports.browser = new Builder().usingServer().withCapabilities({ browserName: 'chrome' }).build();

/**
 * This function for shallow components
 * @function setup
 * @param {object} props - components props
 * @param {any} state - components state
 * @returns {ShallowWrapper}
 */
exports.setup = (Componet, props = {}, state = null) => {
	const wrapper = shallow(<Componet {...props} />);
	state && wrapper.setState(state)
	return wrapper
};

/**
 * This function for find data-test on wrapper
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {String} val - value of data-test
 * @returns {ShallowWrapper}
 */

exports.findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`);
};
