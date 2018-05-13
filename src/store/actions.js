// @flow

// hyper APIs
export const SESSION_USER_DATA = 'SESSION_USER_DATA';

export const WRITE_TO_TERMINAL = 'cli2gui/write to terminal';
export const EXECUTE_COMMAND = 'cli2gui/execute command';
export const writeToTerminal = (command: string, uid: string) => window.rpc.emit(WRITE_TO_TERMINAL, { command, uid });

export function executeCommand(command: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: EXECUTE_COMMAND,
      effect() {
        const state = getState();
        const { activeUid } = state.sessions;
        const currentInput = state.sessions.userInputs[activeUid];
        // execute it by type a '\r'
        writeToTerminal(`${'\b'.repeat(currentInput.length)}${command}\r`, activeUid);
        // clear user input
        dispatch({
          type: SESSION_USER_DATA,
          data: '\r',
        });
      },
    });
  };
}
