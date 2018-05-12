// @flow
import styles from './styles';

export const decorateConfig = (config: Object) => ({
  ...config,
  css: `${config.css || ''}${styles}`,
});
// Recommendation Panel
export { default as decorateHyper } from './components/decorateHyper';
// Get reference to the shell, so we can execute something inside panel
export { default as onWindow } from './onWindow';
// Calculate what to recommend
export { reduceSessions } from './store/reducers';
