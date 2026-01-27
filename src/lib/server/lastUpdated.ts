import { execSync } from 'node:child_process';

export function getLastUpdated(filePath: string) {
  try {
    const date = execSync(
      `git log -1 --format=%cI -- ${filePath}`
    ).toString().trim();

    return date ? new Date(date) : null;
  } catch {
    return null;
  }
}