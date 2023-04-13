const { BrowserWindow, app } = require('electron');
var path = require('path');

const SocialMediaMenu = [];
const MenuStandardOptions = [
	{
		label: 'Fechar',
		click: () => {
			app.quit();
		},
	},
	{
		label: 'Configurações',
		click: () => {
			const win = new BrowserWindow({
				width: 600,
				height: 400,
				webPreferences: {
					nodeIntegration: true,
					contextIsolation: false,
				},
			});
			win.setIcon(path.join(__dirname, '../icons/main.png'));
			win.loadURL(`file://${__dirname}/../views/settings.ejs`);
		},
	},
];

function openWindow(name, url, maximized = false, square = false) {
	let win = null;

	// Icon main
	let iconFile = path.join(__dirname, '../' + '/icons/' + name + '.png');

	// Window size
	let W = square ? 1024 : 450;
	let H = square ? 768 : 800;

	win = new BrowserWindow({
		width: 450,
		height: 800,
		frame: true,
		resizable: true,
		fullscreenable: true,
		selectable: false,
		background: false,
		transparent: true,
		movable: true,
		alwaysOnTop: false,
	});
	win.setMenu(null);
	win.setResizable(true);
	win.setIcon(iconFile);
	if (maximized) {
		win.maximize();
	}
	win.loadURL(url);
}

const genOption = (socialMedia) => {
	const { name, url, windowOptions } = socialMedia;
	const { maximized, square } = windowOptions;
	return {
		label: name,
		click: () => {
			openWindow(name.toLowerCase(), url, maximized, square);
		},
	};
};

const SocialMediaMenuFactory = (SocialMediaList) => {
	SocialMediaList.forEach((SocialMedia) => {
		if (SocialMedia.checked) SocialMediaMenu.push(genOption(SocialMedia));
	});

	return SocialMediaMenu.concat(MenuStandardOptions);
};

module.exports = SocialMediaMenuFactory;
