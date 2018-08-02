// @flow
import {
  PLUGIN,
  CONFIG_LOAD,
  INPUT_STORAGE_PATH,
  UI_DATA_PATH,
  SESSION_ADD,
  SESSION_USER_DATA,
  SEARCH_HISTORY_FULFILL,
  SEARCH_CONTEXT_FULFILL,
  TOGGLE_GUI,
} from './actions';

export function reduceSessions(state: Object, action: Object) {
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

const pluginUIInitialState = { opened: true, [UI_DATA_PATH]: {} };
/** A place to save all data to display, for each tab.
 * Under pluginUIInitialState[UI_DATA_PATH][state.activeUid]
 */
const emptyDataRecords: {
  history: string[],
  context: { [type: string]: string[] },
} = {
  history: [],
  context: {},
};
export function reduceUI(state: Object, action: Object) {
  switch (action.type) {
    case '@@INIT':
    case '@@redux/INIT':
      return state.set(PLUGIN, pluginUIInitialState);
    case TOGGLE_GUI:
      // init state if toggle GUI so early that redux didn't ever init
      if (state[PLUGIN] === undefined) {
        return state.set(PLUGIN, { ...pluginUIInitialState, opened: false });
      }
      return state.setIn([PLUGIN, 'opened'], !state[PLUGIN].opened);
    case SESSION_ADD: {
      // create a place to save all data to display, for each tab
      return state.setIn([PLUGIN, UI_DATA_PATH, action.uid], emptyDataRecords);
    }
    case SEARCH_HISTORY_FULFILL:
      return state.setIn([PLUGIN, UI_DATA_PATH, state.activeUid, 'history'], action.payload);
    case SEARCH_CONTEXT_FULFILL: {
      console.log(action.payload);
      return state.setIn([PLUGIN, UI_DATA_PATH, state.activeUid, 'context'], action.payload);
    }
    case CONFIG_LOAD: {
      const config = action.config?.[PLUGIN] || {};
      return state.setIn([PLUGIN, 'top'], config.top);
    }
    default:
      return state;
  }
}
