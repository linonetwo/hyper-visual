import { SESSION_USER_DATA, searchAffordances } from './actions';

export default store => next => action => {
  // search affordances whenever user input changes
  // TODO: listening on cwd change
  if (action.type === SESSION_USER_DATA) {
    store.dispatch(searchAffordances());
  }
  next(action);
};
