// @flow
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

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
  return history;
}
