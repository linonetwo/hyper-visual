// @flow
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

function readHistory(): Promise<string[]> {
  return new Promise((resolve, reject) =>
    fs.readFile(
      path.join(process.env.HOME, '.bash_history'),
      (error, data: Buffer) => (error ? reject(error) : resolve(data.toString().split('\n'))),
    ),
  );
}

async function getSearchResult(input: string): Promise<string[]> {
  const history = await readHistory();
  return history;
}

export function reduceSessions(state, action) {
  // If it's program that input things, not user, just don't update input status


  switch (action.type) {
    case 'SESSION_ADD':
      // create a place to store user's inputs in each tab
      if (state.userInputs) {
        return state.setIn(['userInputs', action.uid], '');
      }
      return state.set('userInputs', { [action.uid]: '' });

    case 'SESSION_USER_DATA': {
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
