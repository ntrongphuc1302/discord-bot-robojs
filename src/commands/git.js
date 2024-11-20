import { exec } from "child_process";

export const customID = "git"; // This matches the /git command

export default async (interaction) => {
  // Acknowledge the interaction immediately (this will prevent the timeout error)
  await interaction.deferReply({ ephemeral: true });

  // Start the git operation
  exec(
    'git add . && git commit -m "Bot auto-commit: Latest updates pushed to repo" && git push',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return interaction.editReply({
          content: `**Error:** Something went wrong while pushing to GitHub.\n\`\`\`${error.message}\`\`\``,
        });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return interaction.editReply({
          content: `**Warning:** There was a problem with the Git push.\n\`\`\`${stderr}\`\`\``,
        });
      }

      console.log(`stdout: ${stdout}`);
      return interaction.editReply({
        content: `**Success:** Changes have been successfully pushed to GitHub!`,
      });
    }
  );
};
