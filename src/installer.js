import { execa } from "execa";
import ora from "ora";
import fs from "fs-extra";
import path from "path";

export async function installStarterKit(starterKit) {
  const targetDir = path.basename(starterKit.repo, ".git");

  if (fs.existsSync(targetDir)) {
    throw new Error(`Folder "${targetDir}" already exists`);
  }

  const spin = ora("Cloning repository...").start();
  await execa("git", ["clone", "-b", starterKit.branch, starterKit.repo], {
    stdio: "ignore",
  });
  spin.succeed("Repository cloned");

  process.chdir(targetDir);

  for (const step of starterKit.steps) {
    const s = ora(`Running: ${step}`).start();
    try {
      await execa(step, { shell: true, stdio: "ignore" });
      s.succeed();
    } catch {
      s.fail(`Failed: ${step}`);
      throw new Error("Installation stopped due to an error");
    }
  }

  console.log("\n✅ Starter kit ready!");
}
