<script>
  import { Checkbox, Select, Radio, Textarea, Input } from "flowbite-svelte";
  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import loader from "@monaco-editor/loader";
  import { onMount } from "svelte";

  let {
    demoScreenWidth,
    statedValue = $bindable(),
    derivedValue,
    parameter,
  } = $props();

  let useStatedValue = $derived(statedValue != null);
  let useRadio = $derived(parameter.inputType === "radio");
  let useDropdown = $derived(
    parameter.inputType === "dropdown" || "options" in parameter,
  );
  let useTextarea = $derived(
    typeof (useStatedValue ? statedValue : derivedValue) === "string" &&
      typeof parameter.value === "string",
  );
  let useNumberInput = $derived(typeof statedValue === "number");
  let useCheckbox = $derived(typeof statedValue === "boolean");
  let useMonacoEditor = $derived(
    useStatedValue &&
      !useRadio &&
      !useDropdown &&
      !useTextarea &&
      !useNumberInput &&
      !useCheckbox,
  );

  let monacoEditorContainerWidth = $derived(
    useMonacoEditor
      ? demoScreenWidth < 1024
        ? 350
        : demoScreenWidth < 1280
          ? 450
          : 550
      : null,
  );

  let monacoEditorContainerHeight = $derived(
    useMonacoEditor && monacoEditorContainerWidth
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

  let editorContainer = $state();
  let monacoEditor;

  onMount(async () => {
    if (useMonacoEditor) {
      // Load the Monaco editor library
      const monaco = await loader.init();

      monacoEditor = monaco.editor.create(editorContainer, {
        value: statedValue, // Initial editor content bound to the component's value prop
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
        statedValue = monacoEditor.getValue();
      });

      // Cleanup: Dispose Monaco editor instance on component destruction
      return () => {
        monacoEditor?.dispose();
      };
    }
  });
</script>

{#if useStatedValue}
  {#if useRadio}
    <div class="flex flex-col gap-2">
      {#each parameter.options as option, i}
        <Radio value={option} bind:group={statedValue}>
          <span class="text-sm">
            {option}
          </span>
        </Radio>
      {/each}
    </div>
  {:else if useDropdown}
    <Select
      size="sm"
      class="text-base m-0 py-1 pr-8"
      items={parameter.options.map((el) => ({ name: el, value: el }))}
      bind:value={statedValue}
    />
  {:else if useTextarea}
    <Textarea
      unWrappedClass="m-0 px-2 py-1 focus:ring-orange-500 focus:border-orange-500"
      id="textarea-id"
      bind:value={statedValue}
      rows={parameter.rows ?? 1}
    />
  {:else if useNumberInput}
    <Input let:props>
      <input
        type="number"
        {...props}
        step={parameter.step}
        min={parameter.min}
        max={parameter.max}
        bind:value={statedValue}
      />
    </Input>
  {:else if useCheckbox}
    <div class="p-2 h-full">
      <Checkbox bind:checked={statedValue} color="orange"></Checkbox>
    </div>
  {:else if useMonacoEditor}
    <div
      bind:this={editorContainer}
      class="py-2 px-1 m-0 border-solid border-[2px] rounded-md focus-within:ring-orange-500 focus-within:border-orange-500"
      style="height: {monacoEditorContainerHeight}px; width: {monacoEditorContainerWidth}px;"
    ></div>
  {/if}
{:else}
  {#key derivedValue}
    <CodeBlock
      code={typeof derivedValue != "object"
        ? derivedValue.toString()
        : "workingFunction" in derivedValue &&
            "functionAsString" in derivedValue
          ? derivedValue.functionAsString.replace(
              /getValue\("([^"]+)"\)/g,
              "$1",
            )
          : derivedValue}
      language="javascript"
      size="sm"
      includeHeader={false}
    ></CodeBlock>
  {/key}
  {#if typeof derivedValue === "object" && derivedValue.hasOwnProperty("counter")}
    {derivedValue.counter}
  {/if}
{/if}
