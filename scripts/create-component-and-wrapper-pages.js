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
      "Enter the component category (e.g. content, data-vis, layout, ui): ",
    );
    const wantsSubfolder = await askQuestion(
      "Do you want to place the component in a subfolder? (yes/no): ",
    );

    let subfolderName = "";
    if (wantsSubfolder.toLowerCase() === "yes") {
      subfolderName = await askQuestion("Enter the subfolder name: ");
    }

    const includesExamples = await askQuestion(
      "Do you want to add examples of the component in use? (yes/no): ",
    );

    const componentFilePath = path.join(
      process.cwd(),
      "src",
      "lib",
      "package-wrapping",
      "templates",
      "Template.svelte",
    );

    if (!fs.existsSync(componentFilePath)) {
      console.log("Template file does not exist. Please check the path.");
      rl.close();
      return;
    }

    const templateFilePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "BaseTemplateWrapperTest.svelte",
    );

    if (!fs.existsSync(templateFilePath)) {
      console.log("Template file does not exist. Please check the path.");
      rl.close();
      return;
    }

    const examplesFilePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "examples",
      "Examples.svelte",
    );

    if (!fs.existsSync(examplesFilePath)) {
      console.log("Template file does not exist. Please check the path.");
      rl.close();
      return;
    }

    const codeBlocksFilePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "examples",
      "codeBlocks.js",
    );

    if (!fs.existsSync(codeBlocksFilePath)) {
      console.log("Template file does not exist. Please check the path.");
      rl.close();
      return;
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

    const targetExamplesFolderPath = path.join(
      process.cwd(),
      "src",
      "wrappers",
      "components",
      folderName,
      subfolderName,
      pascalToKebabCase(fileName),
    );

    const targetExamplesFilePath = path.join(
      targetExamplesFolderPath,
      "Examples.svelte",
    );

    if (!fs.existsSync(targetExamplesFolderPath)) {
      fs.mkdirSync(targetExamplesFolderPath, { recursive: true });
    }

    ////////////////////////

    const targetCodeBlocksFilePath = path.join(
      targetExamplesFolderPath,
      "codeBlocks.js",
    );

    ////////////////////////

    fs.copyFileSync(componentFilePath, targetComponentFilePath);
    fs.copyFileSync(templateFilePath, targetTemplateFilePath);
    fs.copyFileSync(examplesFilePath, targetExamplesFilePath);
    fs.copyFileSync(codeBlocksFilePath, targetCodeBlocksFilePath);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
})();
