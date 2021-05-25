import {remote} from 'webdriverio';

const start = async () => {
	const browser = await remote({
		capabilities: {
			browserName: 'chrome'
		}
	});
	browser.url('http://10.24.48.120/bee/');

	const login_input = await browser.$('input[name="j_username"]');
	await login_input.setValue('crm0260');

	const password_input = await browser.$('input[name="j_password"]');
	await password_input.setValue('Cedacri1');

	const sumbit = await browser.$('#submit');
	await sumbit.click();

	setTimeout(async () => {
		const timestamp = () => new Date().toString().substring(0, 24).replaceAll(':', '_');
		await browser.saveScreenshot(`./assets/${timestamp()}_before.png`);

		const btn_track = await browser.$(
			'img[src="/bee/VAADIN/themes/bee/img/stop-icon.png"]'
		);
		await btn_track.click();

		await browser.saveScreenshot(`./assets/${timestamp()}.png`);
	}, 6000);
};

export default start;
