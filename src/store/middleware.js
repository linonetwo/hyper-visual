import { PLUGIN, CONFIG_LOAD, CONFIG_RELOAD, SESSION_ADD, SESSION_USER_DATA, searchAffordances, toggleGUI } from './actions';

export default store => next => action => {
  // search affordances whenever user input changes
  // TODO: listening on cwd change
  if (action.type === SESSION_USER_DATA || action.type === SESSION_ADD) {
    store.dispatch(searchAffordances());
  }
  // map config to store
  if (action.type === CONFIG_LOAD || action.type === CONFIG_RELOAD) {
    if (action.config[PLUGIN]) {
      
      if (action.config[PLUGIN].opened === true && store.getState().ui[PLUGIN] === undefined || store.getState().ui[PLUGIN].opened !== true) {
        store.dispatch(toggleGUI());
      }
    }
  }
  next(action);
};
