const { app } = require('electron');
const jetpack = require('fs-jetpack');

/*
  options {
    fileName,
    width,
    height,
  }
*/

module.exports = (options) => {
  const userDataDir = jetpack.cwd(app.getPath('userData'));
  const stateStoreFile = 'window-state.json';
  let currentWindow;

  const config = Object.assign({
    file: 'window-state.json',
    path: app.getPath('userData')
  }, options);

  const state = userDataDir.read((config.file || stateStoreFile), 'json') || {
    width: config.width || 800,
    height: config.height || 800,
  };

  const saveState = () => {
    if (!currentWindow.isMaximized() && !currentWindow.isMinimized()) {
      const position = currentWindow.getPosition();
      const size = currentWindow.getSize();

      state.x = position[0];
      state.y = position[1];
      state.width = size[0];
      state.height = size[1];
    }

    userDataDir.write(stateStoreFile, state, {
      atomic: true
    });
  };

  const removeListeners = () => {
    currentWindow.removeListener('resize', saveState);
    currentWindow.removeListener('move', saveState);
    currentWindow.removeListener('close', removeListeners);
    currentWindow.removeListener('closed', removeListeners);
  };

  const start = (browserWindow) => {
    currentWindow = browserWindow;

    browserWindow.on('resize', saveState);
    browserWindow.on('move', saveState);
    browserWindow.on('close', removeListeners);
    browserWindow.on('closed', removeListeners);
  };

  return {
    get x() {
      return state.x;
    },
    get y() {
      return state.y;
    },
    get width() {
      return state.width;
    },
    get height() {
      return state.height;
    },
    start,
  };
};
