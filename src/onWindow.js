import { WRITE_TO_TERMINAL, SEARCH_HISTORY, SEARCH_HISTORY_FULFILL } from './store/actions';
import { searchHistory } from './search';

/** Listen RPC from renderer process, and write command to terminal session in main process */
export default win => {
  win.rpc.on(WRITE_TO_TERMINAL, ({ uid, command }) => {
    win.sessions.get(uid).write(command);
  });

  win.rpc.on(SEARCH_HISTORY, async input => {
    const history = await searchHistory(input);
    win.rpc.emit(SEARCH_HISTORY_FULFILL, history);
  });
};
