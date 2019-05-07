import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Category } from '../../components/pages/CategoryPage';
import { setup, findByTestAttr } from '../setup';
Enzyme.configure({ adapter: new EnzymeAdapter() });

const category = {
	categories: [ { _id: 1, name: 'name', description: 'description' } ]
};
const getCategory = jest.fn(),
	storeCategory = jest.fn();

test('render category page component', () => {
	const wrapper = setup(Category, { category, getCategory });
	const appComponent = findByTestAttr(wrapper, 'category-card');
	expect(appComponent.length).toBe(1);
});

test('category page should have add category data table', () => {
	const wrapper = setup(Category, { category, getCategory });
	const categoryDataTable = findByTestAttr(wrapper, 'category-datatable');
	expect(categoryDataTable.length).toBe(1);
});

test('category page should have modals for add or edit', () => {
	const wrapper = setup(Category, { category, getCategory });
	const categoryModal = findByTestAttr(wrapper, 'category-modal');
	expect(categoryModal.length).toBe(1);
});

test('category page should have add or edit button modals', () => {
	const wrapper = setup(Category, { category, getCategory });
	const categoryModalBtn = findByTestAttr(wrapper, 'category-modal-button');
	expect(categoryModalBtn.length).toBe(1);
});

test('modal state should false at first render', () => {
	const wrapper = setup(Category, { category, getCategory });
	const initialState = wrapper.state('modal');
	expect(initialState).toBe(false);
});

test('modal state turn to true when add or edit button click', () => {
	const data = {};
	const modal = false;
	const wrapper = setup(Category, { category, getCategory }, { modal });
	const categoryModalBtn = findByTestAttr(wrapper, 'category-modal-button');
	categoryModalBtn.simulate('click', { data });
	wrapper.update();
	expect(wrapper.state().modal).toBe(true);
});

test('modal state turn to false again when submit button click', () => {
	const data = {
		preventDefault: jest.fn()
	};
	const modal = false;
	const wrapper = setup(Category, { category, getCategory, storeCategory }, { modal });
	const categoryModalBtn = findByTestAttr(wrapper, 'category-modal-button');
	categoryModalBtn.simulate('click', data);
	wrapper.update();
	const formSubmit = findByTestAttr(wrapper, 'category-submit');
	formSubmit.simulate('submit', data);
	wrapper.update();
	expect(wrapper.state().modal).toBe(false);
});
