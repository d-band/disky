import { Menu } from 'electron';

export default function createMenu(app, win, mode) {
  return Menu.buildFromTemplate([{
    label: 'Dark mode',
    type: 'checkbox',
    checked: mode === 'dark',
    click() {
      win.webContents.send('toggle-mode');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Quit',
    click: app.quit,
    role: 'quit'
  }]);
}
