import { readdirSync } from "fs";
import path from "path";

export const config = {
  description: "List all available commands for the bot",
};

export default async (interaction) => {
  const commandsDirectory = path.join(process.cwd(), "src", "commands");
  const commandFiles = readdirSync(commandsDirectory).filter((file) =>
    file.endsWith(".js")
  );

  // Extracting the command names
  const commandList = commandFiles.map((file) => {
    const commandName = file.replace(".js", ""); // Remove the .js extension
    return `\`/${commandName}\``;
  });

  // If no commands found, inform the user
  if (commandList.length === 0) {
    return interaction.reply({
      content: "No commands found.",
      ephemeral: true,
    });
  }

  // Format the command list
  const formattedCommandList = commandList.join("\n");

  // Send the list of commands back to the user
  await interaction.reply({
    content: `Here are the available bot commands:\n${formattedCommandList}`,
    ephemeral: true, // Optional: hides the message for the user who triggered it
  });
};
