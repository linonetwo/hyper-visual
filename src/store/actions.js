// @flow

export const WRITE_TO_TERMINAL = 'cli2gui/execute command';
export const writeToTerminal = (command: string, uid: string) => window.rpc.emit(WRITE_TO_TERMINAL, { command, uid });
export const executeCommand = (command: string, uid: string, currentInput: string = '') =>
  writeToTerminal(`${'\b'.repeat(currentInput.length)}${command}\r`, uid);
