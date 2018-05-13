import { SESSION_ADD, SESSION_USER_DATA, searchAffordances } from './actions';

export default store => next => action => {
  // search affordances whenever user input changes
  // TODO: listening on cwd change
  if (action.type === SESSION_USER_DATA || action.type === SESSION_ADD) {
    store.dispatch(searchAffordances());
  }
  next(action);
};
