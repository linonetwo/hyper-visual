// @flow
import { exec } from 'child_process';

export function isGit(cwd: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    exec(`git rev-parse --is-inside-work-tree`, { cwd }, error => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}
