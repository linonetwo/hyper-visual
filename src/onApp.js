// import registerShortcut from 'hyperterm-register-shortcut';

import { TOGGLE_GUI } from './store/actions';

export function toggleGUI(app) {
  [...app.getWindows()][0].rpc.emit(TOGGLE_GUI);
}

