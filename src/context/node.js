// @flow
import readJSON from 'read-package-json';

export function getScriptsList(cwd: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    readJSON(`${cwd}/package.json`, console.error, false, (error, data) => {
      if (error) {
        return reject(error);
      }
      console.log(data);
      return resolve(Object.keys(data?.scripts));
    });
  });
}
