import {
  PLUGIN,
  CONFIG_LOAD,
  INPUT_STORAGE_PATH,
  UI_DATA_PATH,
  SESSION_ADD,
  SESSION_USER_DATA,
  SEARCH_HISTORY_FULFILL,
  TOGGLE_GUI,
} from './actions';

export function reduceSessions(state, action) {
  switch (action.type) {
    case SESSION_ADD:
      // create a place to store user's inputs in each tab
      if (state[INPUT_STORAGE_PATH]) {
        return state.setIn([INPUT_STORAGE_PATH, action.uid], '');
      }
      return state.set(INPUT_STORAGE_PATH, { [action.uid]: '' });

    case SESSION_USER_DATA: {
      const previousInput = state[INPUT_STORAGE_PATH][state.activeUid];
      const pressedKey = action.data;

      // hitting backspace
      if (pressedKey.charCodeAt(0) === 127) {
        return state.setIn([INPUT_STORAGE_PATH, state.activeUid], previousInput ? previousInput.slice(0, -1) : '');
      }
      // pressing Enter ↵
      if (pressedKey.charCodeAt(0) === 13) {
        return state.setIn([INPUT_STORAGE_PATH, state.activeUid], '');
      }
      return state.setIn(
        [INPUT_STORAGE_PATH, state.activeUid],
        (previousInput || '') + (pressedKey || '').toLowerCase(),
      );
    }
    default:
      return state;
  }
}

export function reduceUI(state, action) {
  switch (action.type) {
    case '@@INIT':
      return state.set(PLUGIN, { opened: false, [UI_DATA_PATH]: {} });
    case SESSION_ADD: {
      // create a place to save all data to display, for each tab
      const emptyDataRecords = {
        history: [],
      };
      return state.setIn([PLUGIN, UI_DATA_PATH, action.uid], emptyDataRecords);
    }
    case SEARCH_HISTORY_FULFILL:
      return state.setIn([PLUGIN, UI_DATA_PATH, state.activeUid, 'history'], action.payload);
    case TOGGLE_GUI:
      return state.setIn([PLUGIN, 'opened'], !state[PLUGIN].opened);
    default:
      return state;
  }
}
