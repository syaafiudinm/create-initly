import semver from "semver";
import { execa } from "execa";

export function checkNode() {
  if (!semver.satisfies(process.version, ">=18")) {
    throw new Error("Node.js >= 18 is required");
  }
}

export async function checkGit() {
  try {
    await execa("git", ["--version"]);
  } catch {
    throw new Error("Git is not installed or not in PATH");
  }
}
