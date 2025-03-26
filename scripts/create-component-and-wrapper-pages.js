#!/usr/bin/env node
import fs from "fs";
import readline from "readline";
import path from "path";

// Setup user input interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  try {
    const folder = await askQuestion("Enter the folder path: ");
    const fileName = await askQuestion(
      "Enter the file name (without .svelte): ",
    );

    const filePath = path.join(folder, `${fileName}.svelte`);
    const svelteTemplate = `<script>
export let name = "World"; </script> <h1>Hello {name}!</h1>`;

    // Ensure folder exists
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }

    // Write the file
    fs.writeFileSync(filePath, svelteTemplate);
    console.log(`✅ Created: ${filePath}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    rl.close();
  }
}

main();
