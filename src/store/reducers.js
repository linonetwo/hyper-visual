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

export const reduceUI = (state, action) => {
  // If it's program that input things, not user, just don't update input status
  if (state.ui.execCLIByGUI) return state;

  switch (action.type) {
    case 'SESSION_USER_DATA': {
      const { data } = action;
      if (data.charCodeAt(0) === 127) {
        return state.currentInput ? state.currentInput.slice(0, -1) : '';
      }
      if (data.charCodeAt(0) === 13) {
        return state.set('currentInput', '');
      }
      return state.set('currentInput', (state.currentInput || '') + (data || '').toLowerCase());
    }
    default:
      return state;
  }
};

export const reduceSessions = (state, action) => {
  switch (action.type) {
    case 'SESSION_ADD':
    case 'SESSION_SET_ACTIVE':
      return state.set('currentUID', action.uid);
    default:
      return state;
  }
};
