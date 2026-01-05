import chalk from "chalk";

export function showKitInfo(kit) {
  console.log("\n" + chalk.bold.cyan(kit.name));
  console.log(chalk.gray(kit.description));
  console.log("\n📦 Stacks: " + kit.stacks.map((s) => s.name).join(", "));
  console.log("⏱️  Setup: ~" + kit.setup_time_minutes + " min");
  console.log("📈 Difficulty: " + kit.difficulty);
  console.log("⬇️  Installs: " + (kit.stats?.installs || 0));
  console.log("");
}
