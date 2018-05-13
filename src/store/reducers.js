// @flow
import { SESSION_USER_DATA } from './actions';

export function reduceSessions(state, action) {
  // If it's program that input things, not user, just don't update input status


  switch (action.type) {
    case 'SESSION_ADD':
      // create a place to store user's inputs in each tab
      if (state.userInputs) {
        return state.setIn(['userInputs', action.uid], '');
      }
      return state.set('userInputs', { [action.uid]: '' });

    case SESSION_USER_DATA: {
      const previousInput = state.userInputs[state.activeUid];
      const pressedKey = action.data;

      // hitting backspace
      if (pressedKey.charCodeAt(0) === 127) {
        return state.setIn(['userInputs', state.activeUid], previousInput ? previousInput.slice(0, -1) : '');
      }
      // pressing Enter ↵
      if (pressedKey.charCodeAt(0) === 13) {
        return state.setIn(['userInputs', state.activeUid], '');
      }
      return state.setIn(['userInputs', state.activeUid], (previousInput || '') + (pressedKey || '').toLowerCase());
    }
    default:
      return state;
  }
}
