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
{:else if parameter.hasOwnProperty("functionElements") && parameter.functionElements != null}
  <div class="flex flex-col gap-4">
    {#if parameter.functionElements.hasOwnProperty("counter") || (parameter.functionElements.hasOwnProperty("dataset") && parameter.functionElements.hasOwnProperty("dataset") != null)}
      <div
        data-role="function-counter-and-data-container"
        class="py-1 px-3 bg-slate-100 rounded"
      >
        {#if parameter.functionElements.hasOwnProperty("counter")}
          <p>
            This function has been called <span class="font-bold"
              >{parameter.functionElements.counter}
              time{parameter.functionElements.counter === 1 ? "" : "s"}.</span
            >
          </p>
          {#if parameter.functionElements.hasOwnProperty("dataset")}
            {#each Object.keys(parameter.functionElements.dataset) as key}
              {#if parameter.functionElements.dataset[key] != null}
                <p>
                  When it was last called, its target's data-{key} was
                  <span class="font-bold"
                    >{parameter.functionElements.dataset[key]}</span
                  >.
                </p>
              {/if}
            {/each}
          {/if}
        {/if}
      </div>
    {/if}
    {#if parameter.functionElements.hasOwnProperty("functionAsString")}
      <CodeBlock
        code={typeof derivedValue === "function"
          ? parameter.functionElements.functionAsString.replace(
              /getValue\("([^"]+)"\)/g,
              "$1",
            )
          : typeof derivedValue === "object"
            ? derivedValue
            : derivedValue.toString()}
        language="javascript"
        size="sm"
        includeHeader={false}
      ></CodeBlock>
    {/if}
  </div>
{/if}

<style>
  [data-role="function-counter-and-data-container"] p:first-of-type {
    padding-top: 0px;
    margin-top: 0px;
  }

  [data-role="function-counter-and-data-container"] p:last-of-type {
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
</style>
