<script>
  import {
    Checkbox,
    Select,
    Radio,
    Textarea,
    Button,
    Modal,
  } from "flowbite-svelte";
  import CodeBlock from "$lib/components/content/CodeBlock.svelte";
  import loader from "@monaco-editor/loader";
  import { onMount } from "svelte";

  let { parameter, value = $bindable(), boundedValue } = $props();

  let editorContainer = $state();

  let monacoEditor;
  let codeBlockWidth = $state(0);
  let codeBlockHeight = $state(0);

  let showMonacoEditor = $derived(
    typeof parameter.value === "object" && !parameter.isBinded,
  );

  onMount(async () => {
    if (showMonacoEditor) {
      // Load the Monaco editor library
      const monaco = await loader.init();

      monacoEditor = monaco.editor.create(editorContainer, {
        value: value, // Initial editor content bound to the component's value prop
        language: "javascript",
        theme: "vs-light",
        minimap: { enabled: false },
        scrollbar: {
          verticalScrollbarSize: 8,
        },
        lineNumbers: "off",
        folding: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 12,
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
  });
</script>

{#if parameter.inputType === "code"}
  <div class="flex flex-col gap-2">
    <div bind:clientHeight={codeBlockHeight} bind:clientWidth={codeBlockWidth}>
      <CodeBlock
        code={parameter.isBinded
          ? boundedValue
          : typeof parameter.value === "function"
            ? "function " + value.toString().slice(5)
            : value}
        language="javascript"
        size="sm"
        includeHeader={false}
      ></CodeBlock>
    </div>
    {#if showMonacoEditor}
      <div
        bind:this={editorContainer}
        class="p-0 m-0"
        style="height: {20 * (value.split('\n').length - 1)}px;"
      ></div>
    {/if}
  </div>
{:else if parameter.inputType === "checkbox"}
  <div class="p-2 h-full">
    <Checkbox bind:checked={value} color="orange"></Checkbox>
  </div>
{:else if parameter.inputType === "dropdown"}
  <Select
    size="sm"
    class="text-base m-0 px-2 py-1"
    items={parameter.options.map((el) => ({ name: el, value: el }))}
    bind:value
  />
{:else if parameter.inputType === "radio"}
  <div class="flex flex-col gap-2">
    {#each parameter.options as option, i}
      <Radio value={option} bind:group={value}>
        <span class="text-sm">
          {option}
        </span>
      </Radio>
    {/each}
  </div>
{:else if parameter.inputType === "input"}
  <Textarea
    unWrappedClass="m-0 px-2 py-1"
    id="textarea-id"
    bind:value
    rows={parameter.rows ?? 1}
  />
{/if}
