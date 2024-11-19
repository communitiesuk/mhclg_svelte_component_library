import fs from 'fs';
import path from 'path';

export function identifyFolderStructure(foldersArray) {
  const files = fs.readdirSync(path.resolve(foldersArray.join('/')), {
    withFileTypes: true,
  });

  let subfolders = files
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => [...foldersArray, dirent.name]);

  return subfolders;
}
