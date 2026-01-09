<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";

  import CodeBlock from "$lib/package-wrapping/CodeBlock.svelte";
  import * as codeBlocks from "./codeBlocks.js";

  import Button from "$lib/components/ui/Button.svelte";

  let accordionSnippetSections = [
    {
      id: "1",
      heading: "1. Example 1 - default button",
      content: Example1,
    },
    {
      id: "2",
      heading: "2. Example 2 - button for a form",
      content: Example2,
    },
    {
      id: "3",
      heading: "3. Example 3 - start button",
      content: Example3,
    },
    {
      id: "4",
      heading: "4. Example 4 - more info icon button",
      content: Example4,
    },
    {
      id: "5",
      heading: "5. Example 5 - specify the on click function",
      content: Example5,
    },
  ];

  let name = "";
  let confirmed = $state(false);

  function handleSubmit(event) {
    event.preventDefault();
    confirmed = true;
  }
</script>

<div class="my-20 p-2">
  <h5 class="underline underline-offset-4 my-6">
    Examples of specific use cases
  </h5>
  <Accordion
    activeClass="text-[#EA580C] focus:ring-2 focus:ring-[#EA580C]"
    inactiveClass="text-gray-500 dark:text-gray-400 hover:bg-slate-100"
    defaultClass=""
  >
    {#each accordionSnippetSections as section}
      <AccordionItem>
        <span slot="header" class="text-lg">{section.heading}</span>
        <div class="bg-orange-50 p-5 flex flex-col gap-8">
          {@render section.content()}
        </div>
      </AccordionItem>
    {/each}
  </Accordion>
</div>

{#snippet Example1()}
  <div class="p-5 bg-white">
    <Button textContent="Click me" buttonType="default"></Button>
  </div>
  <CodeBlock code={codeBlocks.codeBlock1} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example2()}
  <div class="p-5 bg-white">
    <p>
      Use the typeAttribute prop to set the button's type attribute. If the
      button is being used to submit a form set the type to 'submit';
    </p>
    <form onsubmit={handleSubmit}>
      <label
        >Enter your name:
        <input type="text" name="username" required /></label
      >
      <Button typeAttribute="submit" textContent="Submit a form"></Button>
    </form>
    {#if confirmed}
      <p style="color: green;">Form submitted successfully!</p>
    {/if}
  </div>
  <CodeBlock code={codeBlocks.codeBlock2} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example3()}
  <div class="p-5 bg-white">
    <p>
      Use a start button for the main call to action on your service’s Start
      page. Start buttons do not usually submit form data so a link tag is used
      instead of a button tag.
    </p>
    <Button textContent="Start" buttonType="start"></Button>
  </div>
  <CodeBlock code={codeBlocks.codeBlock3} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example4()}
  <div class="p-5 bg-white">
    <p>
      Use the more info icon button to give users access to information that you
      want hidden by default.
    </p>
    <Button buttonType="moreInfo"></Button>
  </div>
  <CodeBlock code={codeBlocks.codeBlock4} language="svelte"></CodeBlock>
{/snippet}

{#snippet Example5()}
  <div class="p-5 bg-white">
    <p>
      Use the more info icon button to give users access to information that you
      want hidden by default.
    </p>
    <Button
      buttonType="default"
      onClickFunction={function () {
        console.log("Button clicked");
      }}
    ></Button>
  </div>
  <CodeBlock code={codeBlocks.codeBlock5} language="svelte"></CodeBlock>
{/snippet}
