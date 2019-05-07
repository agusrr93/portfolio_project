const { loginAdmin } = require('../../actions/authAction');

test('Login Admin', () => {
	const data = { email: `anwar@sampan.com`, password: `password` },
		dispatch = jest.fn(),
		setCurrentUser = jest.fn();
	expect(loginAdmin(data)(dispatch)).toBe(dispatch(setCurrentUser));
});
