// @flow
export const PLUGIN = 'visual';
export const INPUT_STORAGE_PATH = `${PLUGIN}/userInputs`;
export const UI_DATA_PATH = 'uiData';
// hyper APIs
export const CONFIG_LOAD = 'CONFIG_LOAD';
export const CONFIG_RELOAD = 'CONFIG_RELOAD';
export const SESSION_USER_DATA = 'SESSION_USER_DATA';
export const SESSION_ADD = 'SESSION_ADD';

export const WRITE_TO_TERMINAL = `${PLUGIN}/write to terminal`;
export const EXECUTE_COMMAND = `${PLUGIN}/execute command`;
export const writeToTerminal = (command: string, uid: string) => window.rpc.emit(WRITE_TO_TERMINAL, { command, uid });
/** 从 state 中取出当前的用户输入 */
function getCurrentInputAndUidPid(store) {
  const { activeUid, sessions } = store.sessions;
  const currentInput = store.sessions[INPUT_STORAGE_PATH][activeUid];
  const activePid = sessions[activeUid].pid
  return { currentInput, activeUid, activePid };
}

/** 把当前的用户输入用 RPC 发送给子进程执行，并往界面上打一个回车 */
export function executeCommand(command: string) {
  return (dispatch: Function, getState: Function) =>
    dispatch({
      type: EXECUTE_COMMAND,
      effect() {
        const state = getState();
        const { currentInput, activeUid } = getCurrentInputAndUidPid(state);
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
export const SEARCH_CONTEXT = `${PLUGIN}/search context`;
export const SEARCH_CONTEXT_FULFILL = `${PLUGIN}/search context/fulfill`;
export const searchContext = (pid: string | number) => window.rpc.emit(SEARCH_CONTEXT, pid);
export const searchContextFulfill = (results: string[]) => ({
  type: SEARCH_CONTEXT_FULFILL,
  payload: results,
});

/** 用当前用户输入、上下文等信息搜索相关内容，展示在 GUI 上，提供可供性 */
export function searchAffordances() {
  return (dispatch: Function, getState: Function) =>
    dispatch({
      type: SEARCH_AFFORDANCES,
      effect() {
        setTimeout(() => {
          const state = getState();
          const { currentInput, activePid } = getCurrentInputAndUidPid(state);
          searchHistory(currentInput);
          // 用 pid 去获取 cwd，然后看看工作目录下有哪些东西
          searchContext(activePid);
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
