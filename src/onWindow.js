import {
  WRITE_TO_TERMINAL,
  SEARCH_HISTORY,
  SEARCH_HISTORY_FULFILL,
  SEARCH_CONTEXT,
  SEARCH_CONTEXT_FULFILL,
} from './store/actions';
import { searchHistory } from './search';
import { getCwd } from './context';

/** Listen RPC from renderer process, and write command to terminal session in main process
 * Don't forget to listen on these message in render process (decorateHyper -> componentDidMount)
 */
export default win => {
  win.rpc.on(WRITE_TO_TERMINAL, ({ uid, command }) => {
    win.sessions.get(uid).write(command);
  });

  win.rpc.on(SEARCH_HISTORY, async input => {
    const history = await searchHistory(input);
    win.rpc.emit(SEARCH_HISTORY_FULFILL, history);
  });

  win.rpc.on(SEARCH_CONTEXT, async pid => {
    const cwd = await getCwd(pid);
    win.rpc.emit(SEARCH_CONTEXT_FULFILL, cwd);
  });
};
