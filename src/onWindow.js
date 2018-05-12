import { WRITE_TO_TERMINAL } from './store/actions';

/** Listen RPC from renderer process, and write command to terminal session in main process */
export default win => {
  win.rpc.on(WRITE_TO_TERMINAL, ({ uid, command }) => {
    win.sessions.get(uid).write(command);
  });
};
