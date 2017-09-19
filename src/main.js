import { app, BrowserWindow, ipcMain } from 'electron';
import getMediaList, { execAsync } from 'ls-usb';
import sudo from 'sudo-prompt';
import createMenu from './menu';

function sudoAsync(cmd) {
  return new Promise((resolve, reject) => {
    sudo.exec(cmd, {
      name: 'Disky'
    }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

let win = null;
app.on('ready', () => {
  win = new BrowserWindow({
    show: false,
    frame: false,
    width: 360,
    height: 572,
    fullscreenable: false,
    maximizable: false,
    resizable: false,
    backgroundColor: '#13161f'
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  win.loadURL(`file://${__dirname}/app.html`);

  win.on('closed', () => {
    win = null;
  });
  ipcMain.on('open-menu', async (event, data) => {
    const menu = await createMenu(app, win, data);
    menu.popup();
  });
});

ipcMain.on('get-medias', async (event) => {
  const data = await getMediaList();
  event.sender.send('get-medias-done', data);
});
ipcMain.on('eject', async (event, arg) => {
  await execAsync(`diskutil eject ${arg}`);
  event.sender.send('mount-done');
});
ipcMain.on('mount-ntfs', async (event) => {
  const data = await getMediaList();
  const cmd = [];
  let isSudo = false;
  data.forEach((media) => {
    media.volumes.forEach((item) => {
      const { node, mount, fs_type, writable, udid } = item;
      if (!node || writable) return;
      if (fs_type === 'ntfs') {
        isSudo = true;
        const dir = mount || `/Volumes/${udid}`;
        if (mount) {
          cmd.push(`diskutil umount ${node}`);
        }
        cmd.push(`mkdir "${dir}"`);
        cmd.push(`mount -o rw,auto,nobrowse -t ntfs ${node} "${dir}"`);
      } else {
        cmd.push(`diskutil mount ${node}`);
      }
    });
  });
  if (cmd.length) {
    if (isSudo) {
      await sudoAsync(cmd.join('&&'));
    } else {
      await execAsync(cmd.join('&&'));
    }
    event.sender.send('mount-done');
  }
});
