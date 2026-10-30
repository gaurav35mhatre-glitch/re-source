import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('\x1b[36m%s\x1b[0m', '==========================================================');
console.log('\x1b[32m%s\x1b[0m', "  re'source — Secondary Material Recovery Platform");
console.log('\x1b[33m%s\x1b[0m', '  Starting Backend (Port 5000) & Frontend (Port 3000)...');
console.log('\x1b[36m%s\x1b[0m', '==========================================================\n');

// 1. Start Backend Server
const server = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// 2. Start Frontend Vite App
const client = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true
});

const cleanup = () => {
  console.log('\n\x1b[31m%s\x1b[0m', 'Shutting down re\'source dev servers...');
  server.kill();
  client.kill();
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
