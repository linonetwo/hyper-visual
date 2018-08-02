// import registerShortcut from 'hyperterm-register-shortcut';

import { PLUGIN, TOGGLE_GUI } from './store/actions';

// look for config[PLUGIN].hotkey
const configKey = PLUGIN;
const defaultShortcut = 'Ctrl+G';

function toggleGUI(app) {
  [...app.getWindows()][0].rpc.emit(TOGGLE_GUI);
}

// export default registerShortcut(configKey, toggleGUI, defaultShortcut);
