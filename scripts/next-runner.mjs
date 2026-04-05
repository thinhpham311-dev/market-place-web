import { spawn } from "node:child_process";

const command = process.argv[2];
const extraArgs = process.argv.slice(3);

if (!command || !["dev", "start"].includes(command)) {
  console.error("Usage: node scripts/next-runner.mjs <dev|start> [...args]");
  process.exit(1);
}

const child = spawn("npx", ["next", command, ...extraArgs], {
  stdio: ["inherit", "pipe", "pipe"],
  shell: process.platform === "win32",
  env: process.env,
});

let hasShownPortInUseMessage = false;

const relayOutput = (stream, writer) => {
  stream.on("data", (chunk) => {
    const text = chunk.toString();
    writer.write(text);

    if (!hasShownPortInUseMessage && text.includes("EADDRINUSE")) {
      hasShownPortInUseMessage = true;
      process.stderr.write(
        "\n[Port Error] Cong 3000 dang duoc su dung. Hay tat tien trinh dang chiem cong hoac chay voi PORT khac, vi du: PORT=3001 npm run dev\n",
      );
    }
  });
};

relayOutput(child.stdout, process.stdout);
relayOutput(child.stderr, process.stderr);

child.on("close", (code) => {
  process.exit(code ?? 1);
});

child.on("error", (error) => {
  if (!hasShownPortInUseMessage && error.message.includes("EADDRINUSE")) {
    hasShownPortInUseMessage = true;
    process.stderr.write(
      "\n[Port Error] Cong 3000 dang duoc su dung. Hay tat tien trinh dang chiem cong hoac chay voi PORT khac, vi du: PORT=3001 npm run dev\n",
    );
  }

  process.stderr.write(`${error.message}\n`);
  process.exit(1);
});
