// @flow
import { exec } from 'child_process';
import fs from 'fs';
import fuzzysearch from 'fuzzysearch';
import { flatten, zip } from 'lodash';
import path from 'path';

/**
 * returns 500 recent history in an array
 * TODO: get remote history when ssh to a server using child_process.exec
 */
async function readHistory(): Promise<string[]> {
  const bashHistoryPath = path.join(process.env.HOME || '~', '.bash_history');
  const zshHistoryPath = path.join(process.env.HOME || '~', '.zsh_history');
  const readBash = new Promise(resolve => {
    fs.readFile(bashHistoryPath, (error, data: Buffer) => (error ? resolve([]) : resolve(data.toString().split('\n'))));
  });

  const readZsh = new Promise(resolve =>
    fs.readFile(zshHistoryPath, (error, data: Buffer) => {
      error
        ? resolve([])
        : resolve(
            data
              .toString()
              .split('\n')
              .map(line => {
                const matchResult = line.match(/(: \d+:\d+;)(.*)/);
                if (!matchResult || matchResult.length !== 3) return '';
                return matchResult[2];
              })
          );
    })
  );
  const [bashHistory, zshHistory] = await Promise.all([readBash, readZsh]);
  return flatten([zshHistory, bashHistory]);
}

export async function searchHistory(input: string): Promise<string[]> {
  const history = await readHistory();
  // fuzzysearch it and sort by frequency in recent 500
  const results = history.filter(command => fuzzysearch(input, command));
  // count frequency
  const dict = results.reduce((prevDict, command) => {
    if (prevDict[command] !== undefined) {
      return { ...prevDict, [command]: prevDict[command] + 1 };
    }
    return { ...prevDict, [command]: 0 };
  }, {});
  const sortedResult = Object.keys(dict).sort((first, second) => (dict[first] < dict[second] ? 1 : -1));
  return sortedResult;
}
