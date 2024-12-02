// src/routes/+page.server.js
import { subFoldersLookup } from '$lib/config.js';
import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
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
      textStringConversion(el[3], 'title-first-word'),
    subFolders: identifyFolderStructure(el),
  }));

  console.log(componentsSubFolders);

  return {
    playgroundFolders,
    componentsSubFolders,
  };
}
