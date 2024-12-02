<script>
  // @ts-nocheck
  import { page } from '$app/stores';
  import ComponentDetails from '$lib/package-wrapping/ComponentDetails.svelte';
  import { textStringConversion } from '$lib/utils/text-string-conversion/textStringConversion.js';
  import { details } from './details.js';

  let { data, homepage = false, folders } = $props();

  let pageInfo = $page?.route.id.split('/');

  details.name = textStringConversion(
    folders ? folders[folders.length - 1] : pageInfo[pageInfo.length - 1],
    'title-first-word'
  );
  details.folder = folders
    ? folders[folders.length - 2]
    : pageInfo[pageInfo.length - 2];
</script>

<ComponentDetails {homepage} {details}></ComponentDetails>
