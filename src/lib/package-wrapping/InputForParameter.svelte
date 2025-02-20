<script>
  import { onMount } from "svelte";
  import loader from "@monaco-editor/loader";
  import Pill from "$lib/components/content/Pill.svelte";
  import { propPillLookup } from "$lib/config.js";
  import { Checkbox, Input, Radio, Select, Textarea } from "flowbite-svelte";

  let { source, value = $bindable() } = $props();

  let propPillObject = propPillLookup[source.isProp];

  // Reference to the div element that will contain the editor
  // Using $state() because Monaco will dynamically modify this element's contents
  // and we want Svelte to track these DOM mutations
  let editorContainer = $state();

  // The actual Monaco editor instance that provides editing functionality
  // This is separate from the container - Monaco will inject its UI into the container
  // when initialized
  let monacoEditor;

  onMount(async () => {
    if (source.inputType === "function" || source.inputType === "javascript") {
      // Load the Monaco editor library
      const monaco = await loader.init();

      // Create a new Monaco editor instance and inject its UI into our container
      monacoEditor = monaco.editor.create(editorContainer, {
        value, // Initial editor content bound to the component's value prop
        language: source.inputType === "javascript" ? "json" : "javascript",
        theme: "vs-dark",
        minimap: { enabled: false },
        lineNumbers: "on",
        folding: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 14,
        formatOnPaste: true,
        formatOnType: true,
      });

      // Establish two-way data binding between editor content and component's value prop
      monacoEditor.onDidChangeModelContent(() => {
        value = monacoEditor.getValue();
      });

      // Cleanup: Dispose Monaco editor instance on component destruction
      return () => {
        monacoEditor?.dispose();
      };
    }
  });
</script>

{#snippet parameterName(name, propPillObject, inline = false)}
  <div class="flex flex-row flex-wrap gap-1 mb-{inline ? 0 : 1} items-center">
    <p class="m-0 p-0 text-lg text-black italic" style="font-weight: 500;">
      {source.name}
    </p>
    <Pill
      size={propPillObject.size}
      textContent={propPillObject.text}
      bgColor={propPillObject.bgColor}
      textColor={propPillObject.textColor}
      borderRadius="15px"
      padding={propPillObject.padding}
    ></Pill>
  </div>
{/snippet}

{#if source.inputType === "function" || source.inputType === "javascript"}
  {@render parameterName(source.name, propPillObject)}
  <!-- Container div for the Monaco editor:
    - bind:this connects this element to our editorContainer variable state
    - The height/border/rounded styles create the visual box for the editor
  -->
  <div
    bind:this={editorContainer}
    class="h-[280px] w-full border rounded"
  ></div>
{:else if source.inputType === "dropdown"}
  {@render parameterName(source.name, propPillObject)}
  <Select
    class="text-base"
    items={source.options.map((el) => ({ name: el, value: el }))}
    bind:value
  />
{:else if source.inputType === "radio"}
  {@render parameterName(source.name, propPillObject)}
  {#each source.options as option, i}
    <Radio value={option} bind:group={value}>
      <span class="text-base font-normal">
        {option}
      </span>
    </Radio>
  {/each}
{:else if source.inputType === "textArea"}
  <div>
    {@render parameterName(source.name, propPillObject)}
    <Textarea id="textarea-id" bind:value rows={9} />
  </div>
{:else if source.inputType === "checkbox"}
  <Checkbox bind:checked={value} color="orange">
    {@render parameterName(source.name, propPillObject, true)}
  </Checkbox>
{:else if source.inputType === "input"}
  {@render parameterName(source.name, propPillObject)}
  <Input size="lg" bind:value />
{:else if source.inputType === "numberInput"}
  {@render parameterName(source.name, propPillObject)}
  <Input let:props>
    <input
      type="number"
      {...props}
      step={source?.step}
      min={source?.min}
      max={source?.max}
      bind:value
    />
  </Input>
{:else if source.inputType === "event"}
  {@render parameterName(source.name, propPillObject)}
  <p class="my-2 mx-0 p-0 text-sm text-black">
    The {source.name} event handler has been called {value[0]} time{value[0] ===
    1
      ? ""
      : "s"}{value[1] ? " (" + value[1] + ")" : ""}.
  </p>
{:else if "label" in source}
  {@render parameterName(source.name, propPillObject)}
{/if}

{#if "label" in source}
  <p class="my-2 mx-0 p-0 text-sm text-black">{source.label}</p>
  {#if source.exampleCode}
    <p
      class="mt-4 mb-0 mx-0 p-0 break-words text-sm rounded-md"
      style="color: #ba029b"
    >
      <code>{@html source.exampleCode}</code>
    </p>
  {/if}
{/if}
