import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ipcRenderer } from 'electron';
import yax from 'yax';
import App from './components/App';
import './index.less';

const store = yax({
  state: {
    mode: 'dark',
    page: 'list',
    list: []
  },
  reducers: {
    gotoPage(state, page) {
      return { ...state, page };
    },
    getMediasDone(state, list) {
      let page = 'list';
      // If has read-only goto mount page
      list.forEach((device) => {
        device.volumes.forEach((item) => {
          if (!item.writable) {
            page = 'mount';
          }
        });
      });
      return { ...state, list, page };
    },
    toggleMode(state) {
      const { mode } = state;
      return { ...state, mode: mode === 'dark' ? 'light' : 'dark' };
    }
  },
  actions: {
    mount() {
      ipcRenderer.send('mount-ntfs');
    },
    eject(ctx, data) {
      ipcRenderer.send('eject', data);
    },
    getMedias() {
      ipcRenderer.send('get-medias');
    }
  }
});

ipcRenderer.on('mount-done', () => {
  ipcRenderer.send('get-medias');
});
ipcRenderer.on('get-medias-done', (event, data) => {
  store.dispatch({
    type: 'getMediasDone',
    payload: data
  });
});
ipcRenderer.on('toggle-mode', () => {
  store.dispatch({
    type: 'toggleMode'
  });
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
