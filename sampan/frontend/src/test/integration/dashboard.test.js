import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Dashboard from '../../containers/Dashboard';
import { setup, findByTestAttr } from '../setup';
Enzyme.configure({ adapter: new EnzymeAdapter() });

test('render dashboard container', () => {
	const wrapper = setup(Dashboard);
	const appComponent = findByTestAttr(wrapper, 'dashboard-container');
	expect(appComponent.length).toBe(1);
});

test('render top navigation on dashboard container', () => {
	const wrapper = setup(Dashboard);
	const topNavigation = findByTestAttr(wrapper, 'sidebar-navigation');
	expect(topNavigation.length).toBe(1);
});

test('render sidebar navigation on dashboard container', () => {
	const wrapper = setup(Dashboard);
	const sidebarNavigation = findByTestAttr(wrapper, 'sidebar-navigation');
	expect(sidebarNavigation.length).toBe(1);
});

test('render main content on dashboard container', () => {
	const wrapper = setup(Dashboard);
	const mainContent = findByTestAttr(wrapper, 'main-content');
	expect(mainContent.length).toBe(1);
});

test('render footer on dashboard container', () => {
	const wrapper = setup(Dashboard);
	const footerComponent = findByTestAttr(wrapper, 'footer-component');
	expect(footerComponent.length).toBe(1);
});
