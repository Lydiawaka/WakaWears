const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

try {
  const envPath = path.resolve(__dirname, ".env");
  console.log("Loading .env from:", envPath);

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2]
          .trim()
          .replace(/^["']|["']$/g, "")
          .trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  } else {
    console.warn(".env file not found!");
  }

  console.log("Running npx prisma db push...");
  execSync("npx prisma db push", {
    stdio: "inherit",
    env: process.env,
    cwd: __dirname,
  });
  console.log("Database push completed successfully.");
} catch (error) {
  console.error("Migration failed:", error);
  process.exit(1);
}
