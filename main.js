const { app, BrowserWindow, screen, Tray, Menu, ipcMain } = require('electron');
const Store = require('electron-store');
const store = new Store();
const ejse = require('ejs-electron');
const SocialMediaMenuFactory = require('./src/modules/SocialMediaMenuFactory');
var path = require('path');

let SocialMediaList = null;
let SocialMediaMenu = null;

function setupSocialMediaList() {
	if (store.get('socialmedialist')) {
		SocialMediaList = store.get('socialmedialist');
	} else {
		SocialMediaList = require('./src/modules/SocialMediaList.js');
	}

	ejse.data('socialmediaoptions', SocialMediaList);
	SocialMediaMenu = SocialMediaMenuFactory(SocialMediaList);
}

function updateList(SocialMediaList, data) {
	return SocialMediaList.map((socialMedia) => {
		if (data.some((item) => item === socialMedia.name.toLowerCase())) {
			socialMedia.checked = true;
		} else {
			socialMedia.checked = false;
		}
		return socialMedia;
	});
}

function restartApplication() {
	app.relaunch();
	app.exit();
}

function mainWindow() {
	let win = null;
	// Icon main
	let iconFile = path.join(__dirname, 'src/icons/main.png');

	// Screen width x height
	const { screeWidth, screeHeight } = screen.getPrimaryDisplay().workAreaSize;

	win = new BrowserWindow({
		width: screeWidth,
		height: screeHeight,
		frame: false,
		resizable: true,
		fullscreenable: false,
		selectable: false,
		background: false,
		transparent: true,
		movable: true,
		icon: iconFile,
		alwaysOnTop: false,
	});

	win.setIcon(iconFile);
	win.maximize();
	win.setFullScreen(true);
	win.setResizable(true);
	win.hide();
	//win.setContentProtection(true);
	win.setMenu(null);

	// Open main window
	win.loadFile('index.html');

	tray = new Tray(iconFile);

	const contextMenu = Menu.buildFromTemplate(SocialMediaMenu);

	tray.setContextMenu(contextMenu);

	ipcMain.on('select-sites', (event, data) => {
		SocialMediaList = updateList(SocialMediaList, data);
		store.set('socialmedialist', SocialMediaList);
		event.reply('saved-sites', 'Ok!');
		restartApplication();
	});

	ipcMain.on('open-createSocialMedia-window', (event,data)=>{
		const createSocialMediaWin = new BrowserWindow({
			width: 800,
			height: 600,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
			},
 		});
		createSocialMediaWin.setIcon(iconFile);
		createSocialMediaWin.loadURL(`file://${__dirname}/src/views/create.ejs`);
	});
}

setupSocialMediaList();
// Load - start ini
app.whenReady().then(mainWindow);
