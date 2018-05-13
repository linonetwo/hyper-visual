// @flow
import styles from './styles';

export const decorateConfig = (config: Object) => ({
  ...config,
  css: `${config.css || ''}${styles}`,
});
// Add UI, and receiving RPC from main thread
export { default as decorateHyper } from './components/decorateHyper';
// Get RPC from renderer thread, exec some thing natively, then RPC back
export { default as onWindow } from './onWindow';
// Handle input recording, and starting of search
export { reduceSessions, reduceUI } from './store/reducers';
// dispatch actions from actions
export { default as middleware } from './store/middleware';
