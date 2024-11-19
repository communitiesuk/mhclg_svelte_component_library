// src/routes/+page.server.js
import { subFoldersLookup } from '$lib/config.js';
import { identifyFolderStructure } from './local-lib/local-utils/identifyFolderStructure.js';

export async function load() {
  let [playgroundFolders, componentsFolders] = ['playground', 'components'].map(
    (el) => ({
      subFolders: identifyFolderStructure(['src', 'routes', el]),
    })
  );

  let componentsSubFolders = componentsFolders.subFolders.map((el) => ({
    label:
      subFoldersLookup[el[el.length - 1]]?.label ||
      subFoldersLookup[el[el.length - 1]],
    subFolders: identifyFolderStructure(el),
  }));

  return {
    playgroundFolders,
    componentsSubFolders,
  };
}
