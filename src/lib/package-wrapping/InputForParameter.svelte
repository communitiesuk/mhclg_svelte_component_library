<script>
  import loader from "@monaco-editor/loader";
  import Pill from "$lib/components/content/Pill.svelte";
  import CodeBlock from "$lib/components/content/CodeBlock.svelte";
  import { propPillLookup } from "$lib/config.js";
  import {
    Checkbox,
    Input,
    Modal,
    Radio,
    Select,
    Textarea,
    Button,
  } from "flowbite-svelte";

  let { source, value = $bindable() } = $props();

  let propPillObject =
    propPillLookup[source.isBindable ? "bindable" : source.isProp];

  // Reference to the div element that will contain the editor
  // Using $state() because Monaco will dynamically modify this element's contents
  // and we want Svelte to track these DOM mutations
  let editorContainer = $state();

  // The actual Monaco editor instance that provides editing functionality
  // This is separate from the container - Monaco will inject its UI into the container
  // when initialized
  let monacoEditor;

  let defaultModal = $state(false);

  async function createModal() {
    defaultModal = true;

    if (source.inputType === "function" || source.inputType === "javascript") {
      // Load the Monaco editor library
      const monaco = await loader.init();

      monacoEditor = monaco.editor.create(editorContainer, {
        value, // Initial editor content bound to the component's value prop
        language: source.inputType === "javascript" ? "json" : "javascript",
        theme: "vs-light",
        minimap: { enabled: false },
        scrollbar: {
          verticalScrollbarSize: 8,
        },
        lineNumbers: "off",
        folding: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 14,
        formatOnPaste: true,
        formatOnType: true,
        wordWrap: "on",
        overviewRulerLanes: 0, // Disables the overview ruler
        overviewRulerBorder: false,
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
  }
</script>

{#snippet parameterName(name, propPillObject, inline = false, modal = false)}
  <div class="flex flex-row flex-wrap justify-between items=center">
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
    {#if modal}
      <div class="flex flex-col justify-center text-xs">
        <Button
          class="p-0 pl-1  m-0 h-[22px] bg-gray-700"
          on:click={createModal}
        >
          <span class="text-xs">Edit</span>
          <svg width="22" height="22">
            <g transform="translate(2,2)scale(0.25)">
              <path
                stroke="none"
                fill="white"
                d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"
              ></path>
            </g>
          </svg>
        </Button>
      </div>
    {/if}
  </div>
{/snippet}

{#if source.inputType === "checkbox"}
  <Checkbox bind:checked={value} color="orange">
    {@render parameterName(source.name, propPillObject, true)}
  </Checkbox>
{/if}

{#if source.inputType === "function" || source.inputType === "javascript"}
  {@render parameterName(source.name, propPillObject, false, true)}
  <!-- Container div for the Monaco editor:
    - bind:this connects this element to our editorContainer variable state
    - The height/border/rounded styles create the visual box for the editor
  -->
  <CodeBlock code={value} language="svelte" size="xs" includeHeader={false} />

  <Modal
    title={source.name}
    bind:open={defaultModal}
    size="lg"
    classHeader="m-0 p-0 text-xl italic"
    outsideclose
  >
    <div bind:this={editorContainer} class="h-[480px] w-full p-2"></div>
    <svelte:fragment slot="footer"></svelte:fragment>
  </Modal>
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

{#if source.label}
  <div
    class="my-2 mx-0 p-2 text-sm text-slate-600 rounded-lg bg-white border border-solid border-slate-600"
  >
    <p class="underline underline-offset-4 p-0 m-0">Desc:</p>
    <p class="p-0 m-0">
      {source.label}
    </p>
  </div>
{/if}

{#if source.exampleCode}
  <p
    class="mt-4 mb-0 mx-0 p-0 break-words text-sm rounded-md"
    style="color: #ba029b"
  >
    <CodeBlock
      code={source.exampleCode}
      language="svelte"
      size="xs"
      includeHeader={false}
    />
  </p>
{/if}
