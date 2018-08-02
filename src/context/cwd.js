// @flow
import { exec } from 'child_process';

/** 用 pid 获取当前工作路径 */
export function getCwd(pid: string | number, action?: { data: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    if (process.platform === 'win32') {
      const directoryRegex = /([a-zA-Z]:[^:[\]?"<>|]+)/im;
      if (action && action.data) {
        const path = directoryRegex.exec(action.data);
        if (path) {
          const [cwd] = path;
          resolve(cwd);
        }
      }
      reject(new Error('getCwd failed in win32'));
    } else {
      exec(`lsof -p ${pid} | awk '$4=="cwd"' | tr -s ' ' | cut -d ' ' -f9-`, (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          const cwd = stdout.trim();
          resolve(cwd);
        }
      });
    }
  });
}
