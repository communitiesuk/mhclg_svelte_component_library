<script>
  import { Checkbox, Select, Radio, Textarea, Input } from "flowbite-svelte";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import loader from "@monaco-editor/loader";
  import { onMount } from "svelte";

  let {
    parameter,
    value = $bindable(),
    boundedValue,
    demoScreenWidth,
  } = $props();

  let editorContainer = $state();

  let monacoEditor;

  let showMonacoEditor = $derived(
    typeof parameter.value === "object" && parameter.isEditable,
  );

  let monacoEditorContainerWidth = $derived(
    showMonacoEditor
      ? demoScreenWidth < 1024
        ? 350
        : demoScreenWidth < 1280
          ? 450
          : 550
      : null,
  );

  let monacoEditorContainerHeight = $derived(
    showMonacoEditor && monacoEditorContainerWidth
      ? 40 +
          20 *
            JSON.stringify(parameter.value, null, 2)
              .split("\n")
              .reduce(
                (acc, str) =>
                  acc +
                  Math.ceil(
                    str.length / ((monacoEditorContainerWidth - 15) / 7.5),
                  ),
                0,
              )
      : null,
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
        fontSize: 13,
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

  $inspect(parameter.name, value, boundedValue);
</script>

{#if parameter.isEditable}
  {#if showMonacoEditor}
    <div
      bind:this={editorContainer}
      class="py-2 px-1 m-0 border-solid border-[2px] rounded-md focus-within:ring-orange-500 focus-within:border-orange-500"
      style="height: {monacoEditorContainerHeight}px; width: {monacoEditorContainerWidth}px;"
    ></div>
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
      unWrappedClass="m-0 px-2 py-1 focus:ring-orange-500 focus:border-orange-500"
      id="textarea-id"
      bind:value
      rows={parameter.rows ?? 1}
    />
  {:else if parameter.inputType === "numberInput"}
    <Input let:props>
      <input
        type="number"
        {...props}
        step={parameter?.step}
        min={parameter?.min}
        max={parameter?.max}
        bind:value
      />
    </Input>
  {/if}
{:else}
  {#key boundedValue}
    <CodeBlock
      code={boundedValue}
      language="javascript"
      size="sm"
      includeHeader={false}
    ></CodeBlock>
  {/key}
{/if}

<!-- {#if showMonacoEditor}
  <div
    bind:this={editorContainer}
    class="py-2 px-1 m-0 border-solid border-[2px] rounded-md focus-within:ring-orange-500 focus-within:border-orange-500"
    style="height: {monacoEditorContainerHeight}px; width: {monacoEditorContainerWidth}px;"
  ></div>
{:else if parameter.inputType === "code"}
  <div bind:clientHeight={codeBlockHeight} bind:clientWidth={codeBlockWidth}>
    <CodeBlock
      code={codeBlockType === "function"
        ? "function " + codeBlockValue.toString().slice(5)
        : codeBlockValue}
      language="javascript"
      size="sm"
      includeHeader={false}
    ></CodeBlock>
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
    unWrappedClass="m-0 px-2 py-1 focus:ring-orange-500 focus:border-orange-500"
    id="textarea-id"
    bind:value
    rows={parameter.rows ?? 1}
  />
{:else if parameter.inputType === "numberInput"}
  <Input let:props>
    <input
      type="number"
      {...props}
      step={parameter?.step}
      min={parameter?.min}
      max={parameter?.max}
      bind:value
    />
  </Input>
{/if} -->
