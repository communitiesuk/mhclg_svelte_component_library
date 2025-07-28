declare namespace svelteHTML {
  // Enhance attributes for svelte:window
  interface HTMLAttributes<T> {
    // Custom localStorage change event
    onlocalStorageChange?: (event: CustomEvent) => void;
  }
}
