// @flow
export const PLUGIN = 'cli2gui';
export const INPUT_STORAGE_PATH = `${PLUGIN}/userInputs`;
export const UI_DATA_PATH = `${PLUGIN}/uiData`;
// hyper APIs
export const SESSION_USER_DATA = 'SESSION_USER_DATA';
export const SESSION_ADD = 'SESSION_ADD';

export const WRITE_TO_TERMINAL = `${PLUGIN}/write to terminal`;
export const EXECUTE_COMMAND = `${PLUGIN}/execute command`;
export const writeToTerminal = (command: string, uid: string) => window.rpc.emit(WRITE_TO_TERMINAL, { command, uid });
function getCurrentInput(store) {
  const { activeUid } = store.sessions;
  const currentInput = store.sessions[INPUT_STORAGE_PATH][activeUid];
  return { currentInput, activeUid };
}
export function executeCommand(command: string) {
  return (dispatch: Function, getState: Function) =>
    dispatch({
      type: EXECUTE_COMMAND,
      effect() {
        const state = getState();
        const { currentInput, activeUid } = getCurrentInput(state);
        // execute it by type a '\r'
        writeToTerminal(`${'\b'.repeat(currentInput.length)}${command}\r`, activeUid);
        // clear user input
        dispatch({
          type: SESSION_USER_DATA,
          data: '\r',
        });
      },
    });
}

export const SEARCH_AFFORDANCES = `${PLUGIN}/search affordances`;
export const SEARCH_HISTORY = `${PLUGIN}/search history`;
export const SEARCH_HISTORY_FULFILL = `${PLUGIN}/search history/fulfill`;
export const searchHistory = (input: string) => window.rpc.emit(SEARCH_HISTORY, input);
export const searchHistoryFulfill = (results: string[]) => ({
  type: SEARCH_HISTORY_FULFILL,
  payload: results,
});
export function searchAffordances() {
  return (dispatch: Function, getState: Function) =>
    dispatch({
      type: SEARCH_AFFORDANCES,
      effect() {
        setTimeout(() => {
          const state = getState();
          const { currentInput } = getCurrentInput(state);
          searchHistory(currentInput);
        }, 10);
      },
    });
}

export const TOGGLE_GUI = `${PLUGIN}/toggle gui`;
export function toggleGUI() {
  return {
    type: TOGGLE_GUI,
  };
}
