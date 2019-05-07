const { Key, By, until } = require('selenium-webdriver'),
	{ browser, serverUri } = require('../setup');

test('Login Admin', () => {
	jest.setTimeout(30000);
	return new Promise((resolve, reject) => {
		browser
			.get(`${serverUri}/admin`)
			.then(() => browser.findElement({ id: 'email-input' }).sendKeys('anwar@sampan.com'))
			.then(() => browser.findElement(By.id('password-input')).sendKeys('password', Key.ENTER))
			.then(() => browser.wait(until.urlIs(`${serverUri}/dashboard`)))
			.then(() => resolve(browser.quit()))
			.catch((err) => reject(err));
	});
});
