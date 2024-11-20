import { exec } from "child_process";

export const customID = "git"; // This matches the /git command

export default async (interaction) => {
  // Acknowledge the interaction immediately to prevent timeout
  await interaction.deferReply({ ephemeral: true });

  exec(
    'git add . && git commit -m "Bot auto-commit: Latest updates pushed to repo" && git push',
    (error, stdout, stderr) => {
      if (error) {
        // Actual error occurred
        console.error(`Error: ${error.message}`);
        return interaction.editReply({
          content: `**Error:** Something went wrong while pushing to GitHub.\n\`\`\`${error.message}\`\`\``,
        });
      }

      if (stderr) {
        // Git stderr may include some warnings, but not errors
        console.warn(`stderr: ${stderr}`);
        return interaction.editReply({
          content: `**Warning:** There was a problem with the Git push, but it was still successful.\n\`\`\`${stderr}\`\`\``,
        });
      }

      // Success output
      console.log(`stdout: ${stdout}`);
      return interaction.editReply({
        content: `**Success:** Changes have been successfully pushed to GitHub!\n\`\`\`${stdout}\`\`\``,
      });
    }
  );
};
