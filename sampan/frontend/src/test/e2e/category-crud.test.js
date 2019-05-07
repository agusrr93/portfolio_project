import { Key, By, until } from 'selenium-webdriver';
import { browser, serverUri } from '../setup';
import { setup } from '../setup';
import Message from '../../components/Message';

const color = 'success',
	msg = ''

test('Create Category', () => {
	jest.setTimeout(100000);
	return new Promise((resolve, reject) => {
		browser
			.get(`${serverUri}/admin`)
			.then(async () => {
				await browser.sleep(1500);
				await browser.findElement({ id: 'email-input' }).sendKeys('anwar@sampan.com');
				await browser.findElement(By.id('password-input')).sendKeys('password', Key.ENTER);
				await browser.wait(until.urlIs(`${serverUri}/dashboard`));
				const categoryNav = await browser.findElement({ id: 'category-nav' });
				await categoryNav.click();
				await browser.wait(until.urlIs(`${serverUri}/category`));
				await browser.sleep(2500);
				const addButton = await browser.findElement(By.id('category-modal-button'));
				await addButton.click();
				await browser.wait(until.elementLocated(By.id('category-name')));
				await browser.findElements(By.id('category-name'));
				await browser.wait(until.elementLocated(By.id('category-submit')));
				await browser.sleep(1000);
				await browser.findElement(By.id('category-name')).sendKeys('New Category Name', Key.TAB);
				await browser.findElement(By.id('category-description')).sendKeys('New Category Description', Key.ENTER);
			})
			.then(async () => {
				const wrapper = await setup(Message, { color, msg });
				await expect(wrapper.length).toBe(1);
				await browser.sleep(3500);
			})
			.then(() => resolve())
			.catch((err) => reject(err));
	});
});

test('Edit Category', () => {
	jest.setTimeout(100000);
	return new Promise(async (resolve, reject) => {
		browser
			.get(`${serverUri}/category`)
			.then(async () => {
				await browser.wait(until.urlIs(`${serverUri}/category`));
				await browser.wait(until.elementLocated(By.id('category-datatable')));
				await browser.sleep(2500);
				await browser.findElement(By.id('category-datatable'));
				const editButton = await browser.findElement(By.id('edit-category0'));
				await editButton.click();
				await browser.findElements(By.id('category-name'));
				await browser.wait(until.elementLocated(By.id('category-submit')));
				await browser.sleep(1000);
				await browser.wait(until.elementLocated(By.id('category-name')));
				await browser.findElement(By.id('category-name')).clear();
				await browser.findElement(By.id('category-name')).sendKeys('Category Name Edited', Key.TAB);
				await browser.findElement(By.id('category-description')).clear();
				await browser
					.findElement(By.id('category-description'))
					.sendKeys('Category Description Edited', Key.ENTER);
			})
			.then(async () => {
				const wrapper = await setup(Message, { color, msg });
				await expect(wrapper.length).toBe(1);
				await browser.sleep(3500);
			})
			.then(() => resolve())
			.catch((err) => reject(err));
	});
});

test('Delete Category', () => {
	jest.setTimeout(100000);
	return new Promise(async (resolve, reject) => {
		browser
			.get(`${serverUri}/category`)
			.then(async () => {
				await browser.wait(until.urlIs(`${serverUri}/category`));
				await browser.wait(until.elementLocated(By.id('category-datatable')));
				await browser.sleep(2500);
				await browser.findElement(By.id('category-datatable'));
				const deleteButton = await browser.findElement(By.id('delete-category0'));
				await deleteButton.click();
				await browser.sleep(1000);
			})
			.then(async () => {
				const wrapper = await setup(Message, { color, msg });
				await expect(wrapper.length).toBe(1);
				await browser.sleep(3500);
			})
			.then(() => resolve(browser.quit()))
			.catch((err) => reject(err));
	});
});
