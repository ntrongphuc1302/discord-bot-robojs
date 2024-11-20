import { exec } from "child_process";

export const customID = "git"; // This matches the /git command
export default async (interaction) => {
  exec(
    'git add . && git commit -m "Auto commit" && git push',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return interaction.reply({
          content: `Error: ${error.message}`,
          ephemeral: true,
        });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return interaction.reply({
          content: `stderr: ${stderr}`,
          ephemeral: true,
        });
      }
      console.log(`stdout: ${stdout}`);
      return interaction.reply({
        content: `Successfully pushed to GitHub!`,
        ephemeral: true,
      });
    }
  );
};