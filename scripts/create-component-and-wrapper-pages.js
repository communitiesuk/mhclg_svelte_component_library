import fs from "fs";
import path from "path";
import readline from "readline";

function pascalToKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Insert hyphen between lowercase & uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2") // Handle consecutive uppercase letters
    .toLowerCase();
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

(async () => {
  try {
    const fileName = await askQuestion("Enter the name of the new component: ");
    const folderName = await askQuestion(
      "Enter the component category (choose from: content, data-vis, layout, ui): ",
    );

    if (!["content", "data-vis", "layout", "ui"].includes(folderName)) {
      console.log(
        "Script aborted. ERROR: Question must be answered either 'content', 'data-vis', 'layout' or 'ui'.",
      );
      rl.close();
      return;
    }

    const wantsSubfolder = await askQuestion(
      "Do you want to place the component in a subfolder? (yes/no): ",
    );

    if (!["yes", "no"].includes(wantsSubfolder.toLowerCase())) {
      console.log(
        "Script aborted. ERROR: Question must be answered either 'yes' or 'no'.",
      );
      rl.close();
      return;
    }

    let subfolderName = "";
    if (wantsSubfolder.toLowerCase() === "yes") {
      subfolderName = await askQuestion("Enter the subfolder name: ");
    }

    const includesExamples = await askQuestion(
      "Do you want to add examples of the component in use? (yes/no): ",
    );

    if (!["yes", "no"].includes(includesExamples.toLowerCase())) {
      console.log(
        "Script aborted. ERROR: Question must be answered either 'yes' or 'no'.",
      );
      rl.close();
      return;
    }

    const componentFilePath = path.join(
      process.cwd(),
      "src",
      "lib",
      "package-wrapping",
      "templates",
      "Template.svelte",
    );

    if (!fs.existsSync(componentFilePath)) {
      console.log(
        "Script aborted. ERROR: Template component file does not exist.",
      );
      rl.close();
      return;
    }

    const templateFilePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "BaseTemplateWrapper.svelte",
    );

    if (!fs.existsSync(templateFilePath)) {
      console.log(
        "Script aborted. ERROR: BaseTemplate wrapper file does not exist.",
      );
      rl.close();
      return;
    }

    let examplesFilePath, codeBlocksFilePath;
    if (includesExamples) {
      examplesFilePath = path.join(
        process.cwd(),
        "src",
        "templates",
        "examples",
        "Examples.svelte",
      );

      if (!fs.existsSync(examplesFilePath)) {
        console.log(
          "Script aborted. ERROR: Examples template file does not exist.",
        );
        rl.close();
        return;
      }

      codeBlocksFilePath = path.join(
        process.cwd(),
        "src",
        "templates",
        "examples",
        "codeBlocks.js",
      );

      if (!fs.existsSync(codeBlocksFilePath)) {
        console.log(
          "Script aborted. ERROR: codeBlocks.js file does not exist.",
        );
        rl.close();
        return;
      }
    }

    ////////////////////////

    const targetComponentFolderPath = path.join(
      process.cwd(),
      "src",
      "lib",
      "components",
      folderName,
      subfolderName,
    );
    const targetComponentFilePath = path.join(
      targetComponentFolderPath,
      fileName + ".svelte",
    );

    if (!fs.existsSync(targetComponentFolderPath)) {
      fs.mkdirSync(targetComponentFolderPath, { recursive: true });
    }

    ////////////////////////

    const targetTemplateFolderPath = path.join(
      process.cwd(),
      "src",
      "wrappers",
      "components",
      folderName,
      subfolderName,
    );
    const targetTemplateFilePath = path.join(
      targetTemplateFolderPath,
      fileName + "Wrapper.svelte",
    );

    if (!fs.existsSync(targetTemplateFolderPath)) {
      fs.mkdirSync(targetTemplateFolderPath, { recursive: true });
    }

    ////////////////////////

    let targetExamplesFolderPath,
      targetExamplesFilePath,
      targetCodeBlocksFilePath;
    if (includesExamples) {
      targetExamplesFolderPath = path.join(
        process.cwd(),
        "src",
        "wrappers",
        "components",
        folderName,
        subfolderName,
        pascalToKebabCase(fileName),
      );

      targetExamplesFilePath = path.join(
        targetExamplesFolderPath,
        "Examples.svelte",
      );

      if (!fs.existsSync(targetExamplesFolderPath)) {
        fs.mkdirSync(targetExamplesFolderPath, { recursive: true });
      }

      ////////////////////////

      targetCodeBlocksFilePath = path.join(
        targetExamplesFolderPath,
        "codeBlocks.js",
      );
    }

    ////////////////////////

    if (fs.existsSync(targetComponentFilePath)) {
      console.log(
        `Script aborted. ERROR: ${targetComponentFilePath} already exists.`,
      );
      rl.close();
      return;
    }

    if (fs.existsSync(targetTemplateFilePath)) {
      console.log(
        `Script aborted. ERROR: ${targetTemplateFilePath} already exists.`,
      );
      rl.close();
      return;
    }

    if (includesExamples.toLowerCase() === "yes") {
      if (fs.existsSync(targetExamplesFilePath)) {
        console.log(
          `Script aborted. ERROR: ${targetExamplesFilePath} already exists.`,
        );
        rl.close();
        return;
      }

      if (fs.existsSync(targetCodeBlocksFilePath)) {
        console.log(
          `Script aborted. ERROR: ${targetCodeBlocksFilePath} already exists.`,
        );
        rl.close();
        return;
      }
    }

    fs.copyFileSync(componentFilePath, targetComponentFilePath);
    console.log(`New component file created at ${targetComponentFilePath}.`);
    fs.copyFileSync(templateFilePath, targetTemplateFilePath);
    console.log(`New wrapper file created at ${targetTemplateFilePath}.`);

    if (includesExamples.toLowerCase() === "yes") {
      fs.copyFileSync(examplesFilePath, targetExamplesFilePath);
      console.log(
        `New examples svelte file created at ${targetExamplesFilePath}.`,
      );

      fs.copyFileSync(codeBlocksFilePath, targetCodeBlocksFilePath);
      console.log(
        `New codeBlocks.js file created at ${targetCodeBlocksFilePath}.`,
      );
    }

    modifyFile(
      targetTemplateFilePath,
      'import Template from "$lib/package-wrapping/templates/Template.svelte";',
      `import ${fileName} from "$lib/components/${folderName + (subfolderName === "" ? "" : "/" + subfolderName)}/${fileName}.svelte";`,
    );

    modifyFile(
      targetTemplateFilePath,
      "<Template {...parametersObject}></Template>",
      `<${fileName} {...parametersObject}></${fileName}>`,
    );

    if (includesExamples.toLowerCase() === "yes") {
      modifyFile(
        targetTemplateFilePath,
        'import Examples from "./examples/Examples.svelte";',
        `import Examples from "./${pascalToKebabCase(fileName)}/Examples.svelte";`,
      );
    } else {
      modifyFile(
        targetTemplateFilePath,
        'import Examples from "./examples/Examples.svelte";',
        "",
      );

      modifyFile(targetTemplateFilePath, "<Examples></Examples>", "");
    }

    //import TestChecker from "$lib//Users/andrewhillman1/Documents/mhclg/oflog_svelte_component_library/src/lib/components/data-vis/TestChecker.svelte

    console.log("Script complete with no issues identified.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
})();

const modifyFile = (filePath, searchLine, replaceLine) => {
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping modification. File not found: ${filePath}`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const fileLines = fileContent.split("\n");

  let modified = false;
  const updatedLines = fileLines.map((line) => {
    if (line.trim() === searchLine.trim()) {
      modified = true;
      return replaceLine;
    }
    return line;
  });

  if (modified) {
    fs.writeFileSync(filePath, updatedLines.join("\n"), "utf8");
    console.log(`Modified file: ${filePath}`);
  } else {
    console.log(`No changes made to ${filePath}. Target line not found.`);
  }
};
