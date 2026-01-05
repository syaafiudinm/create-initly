import { execa } from "execa";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { trackInstall } from "./api.js";

export async function installStarterKit(starterKit) {
  const repoUrl = starterKit.version.repo_url;
  const repoName = path.basename(repoUrl, ".git");
  const branch = starterKit.version.branch || "main";
  const targetDir = `./${repoName}`;

  if (fs.existsSync(targetDir)) {
    throw new Error(`Folder "${repoName}" already exists`);
  }

  const cloneSpin = ora("Cloning repository...").start();
  try {
    await execa("git", ["clone", "-b", starterKit.branch, starterKit.repo], {
      stdio: "ignore",
    });
    cloneSpin.succeed(`Repository cloned to ${repoName}`);
  } catch {
    cloneSpin.fail("Failed to clone repository");
    throw new Error(`Git clone failed: ${err.message}`);
  }
  spin.succeed("Repository cloned");

  process.chdir(targetDir);

  const installCommand = starterKit.version.installCommand;

  if (installCommand) {
    const installSpin = ora(`Running: ${installCommand}`).start();
    try {
      await execa(installCommand, { shell: true, stdio: "inherit" });
      installSpin.succeed("Dependencies installed");
    } catch {
      installSpin.fail(`Failed to run ${installCommand}`);
      throw new Error("Dependencies installation failed");
    }
  }

  try {
    await trackInstall(starterKit.slug);
  } catch (err) {
    console.error(err);
    console.warn("⚠️  Could not track installation");
  }

  console.log("\n✅ Starter kit ready!");
  console.log(`\n📂 cd ${repoName}`);

  if (starterKit.version.install_command) {
    console.log("🚀 Start developing!\n");
  } else {
    console.log("📦 Run 'npm install' to install dependencies\n");
  }
}
