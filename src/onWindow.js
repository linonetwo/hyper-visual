// @flow
import {
  WRITE_TO_TERMINAL,
  SEARCH_HISTORY,
  SEARCH_HISTORY_FULFILL,
  SEARCH_CONTEXT,
  SEARCH_CONTEXT_FULFILL,
} from './store/actions';
import { searchHistory } from './search';
import { getCwd } from './context/cwd';
import { getScriptsList } from './context/node';

/** Listen RPC from renderer process, and write command to terminal session in main process
 * Don't forget to listen on these message in render process (decorateHyper -> componentDidMount)
 */
export default (win: Object) => {
  win.rpc.on(WRITE_TO_TERMINAL, ({ uid, command }) => {
    win.sessions.get(uid).write(command);
  });

  win.rpc.on(SEARCH_HISTORY, async input => {
    const history = await searchHistory(input);
    win.rpc.emit(SEARCH_HISTORY_FULFILL, history);
  });

  win.rpc.on(SEARCH_CONTEXT, async pid => {
    const cwd = await getCwd(pid);
    const contextCommands: { [type: string]: string[] } = {};

    try {
      const npmScripts = await getScriptsList(cwd);
      if (npmScripts.length > 0) {
        contextCommands.node = npmScripts;
      }
    } catch (error) {
      console.error('npmScripts', error);
    }

    win.rpc.emit(SEARCH_CONTEXT_FULFILL, contextCommands);
  });
};
