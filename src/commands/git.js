import { exec } from "child_process";

export const customID = "git"; // This matches the /git command

export default async (interaction) => {
  exec(
    'git add . && git commit -m "Bot auto-commit: Latest updates pushed to repo" && git push',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return interaction.reply({
          content: `**Error:** Something went wrong while pushing to GitHub.\n\`\`\`${error.message}\`\`\``,
          ephemeral: true,
        });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return interaction.reply({
          content: `**Warning:** There was a problem with the Git push.\n\`\`\`${stderr}\`\`\``,
          ephemeral: true,
        });
      }

      console.log(`stdout: ${stdout}`);
      return interaction.reply({
        content: `**Success:** Changes have been successfully pushed to GitHub!`,
        ephemeral: true,
      });
    }
  );
};
