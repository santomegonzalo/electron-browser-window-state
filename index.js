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

  const config = Object.assign({
    file: 'window-state.json',
    path: app.getPath('userData'),
    maximize: true,
    fullScreen: true
  }, options);

  const state = userDataDir.read((options.fileName || stateStoreFile), 'json') || {
    width: options.width || 800,
    height: options.height || 800,
  };

  const saveState = (win) => {
    if (!win.isMaximized() && !win.isMinimized()) {
      const position = win.getPosition();
      const size = win.getSize();
      state.x = position[0];
      state.y = position[1];
      state.width = size[0];
      state.height = size[1];
    }

    userDataDir.write(stateStoreFile, state, {
      atomic: true
    });
  };

  const savePath = (path) => {
    state.path = path;
    userDataDir.write(stateStoreFile, state, {
      atomic: true
    });
  };

  const manage = (browserWindow) => {

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
    get isMaximized() {
      return state.isMaximized;
    },
    get isFullScreen() {
      return state.isFullScreen;
    },
    saveState,
    savePath,
  };
};
