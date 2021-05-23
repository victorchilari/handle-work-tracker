import {remote} from 'webdriverio';
import * as cfg from './settings.json';

(async () => {
	const browser = await remote({
		capabilities: {
			browserName: 'chrome'
		}
	});
	browser.url(cfg.url);

	cfg.inputs.forEach(e => {
		const input = await browser.$(e.id);
		await input.setValue(e.value);
	});

	const sumbit = await browser.$(cfg.buttons.login);
	await sumbit.click();

	setTimeout(async () => {
		const timestamp = () => new Date().toUTCString().replaceAll(':', '_');
		const takeSceenshot = (suffix) => await browser.saveScreenshot(`./assets/${timestamp() + suffix}.png`);
		
		takeSceenshot('_before');

		let btn_track = null
		switch (process.argv[2]) {
			case "start":
				btn_track = await browser.$(cfg.buttons.start);
				break;
			case "stop":
				btn_track = await browser.$(cfg.buttons.stop);
				break;
		
			default:
				console.log("Need param to understand which button to press");
				break;
		}
		await btn_track.click();

		takeSceenshot();
	}, 6000);
})();
