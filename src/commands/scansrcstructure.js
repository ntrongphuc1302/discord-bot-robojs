import { readdirSync } from "node:fs";
import path from "node:path";

export const config = {
  description: "Scan and export the bot file structure to a message", // Shortened description
};

export default async (interaction) => {
  const rootDirectory = process.cwd(); // Get the current working directory (root of the bot)
  const fileStructure = scanFiles(rootDirectory);

  // Format the output to make it more readable
  const formattedStructure = formatFileStructure(fileStructure);

  // Reply to the user with the formatted file structure
  await interaction.reply({
    content: `The file structure:\n\`\`\`\n${formattedStructure}\n\`\`\``,
    ephemeral: true, // Optional: hides the message for the user who triggered it
  });
};

// Function to scan a directory recursively and return a structured representation
function scanFiles(dirPath) {
  const structure = [];
  const files = readdirSync(dirPath, { withFileTypes: true });

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file.name);
    if (file.isDirectory()) {
      // Skip 'node_modules' and '.robo' directories
      if (
        file.name === "node_modules" ||
        file.name === ".robo" ||
        file.name === "hooks" ||
        file.name === "logs" ||
        file.name === "objects" ||
        file.name === ".git" ||
        file.name === "info"
      ) {
        return;
      }
      structure.push({
        type: "directory",
        name: file.name,
        children: scanFiles(fullPath),
      });
    } else {
      structure.push({ type: "file", name: file.name });
    }
  });

  return structure;
}

// Function to format the file structure into a readable tree-like string
function formatFileStructure(files, level = 0) {
  let result = "";
  files.forEach((file, index, array) => {
    const isLast = index === array.length - 1;
    const indentation = "│   ".repeat(level);
    const fileIndicator = isLast ? "└── " : "├── ";

    if (file.type === "directory") {
      result += `${indentation}${fileIndicator}/${file.name}\n`;
      result += formatFileStructure(file.children, level + 1);
    } else {
      result += `${indentation}${fileIndicator}${file.name}\n`;
    }
  });
  return result;
}
