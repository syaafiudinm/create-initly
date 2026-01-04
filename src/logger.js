import chalk from "chalk";

export function error(msg) {
  console.error(chalk.red("❌ " + msg));
}
