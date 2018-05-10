// @flow
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import type { Map } from 'immutable';

import { execCLIByGUI } from './actions';

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

export function reduceSessions(state: Map<*, *>, action) {
  // If it's program that input things, not user, just don't update input status
  if (action.type === execCLIByGUI.FULFILL) {
    return state.set('execCLIByGUI', false);
  }
  if (state.execCLIByGUI) return state;

  switch (action.type) {
    case execCLIByGUI.TRIGGER:
      return state.set('execCLIByGUI', true);

    case 'SESSION_ADD':
      // create a place to store user's inputs in each tab
      if (state.userInputs) {
        return state.setIn(['userInputs', action.uid], '');
      }
      return state.set('userInputs', { [action.uid]: '' });
    case 'SESSION_USER_EXIT':
      return state.deleteIn(['userInputs', action.uid]);

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
