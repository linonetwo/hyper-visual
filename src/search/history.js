// @flow
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import fuzzysearch from 'fuzzysearch';

/** returns 500 recent history in an array
 * TODO: get remote history when ssh to a server using child_process.exec
 */
function readHistory(): Promise<string[]> {
  return new Promise((resolve, reject) =>
    fs.readFile(
      path.join(process.env.HOME || '~', '.bash_history'),
      (error, data: Buffer) => (error ? reject(error) : resolve(data.toString().split('\n'))),
    ),
  );
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
  const sortedResult = results.sort((first, second) => (dict[first] < dict[second] ? 1 : -1));
  return sortedResult;
}
