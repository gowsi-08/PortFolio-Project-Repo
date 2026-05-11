#!/usr/bin/env node

/**
 * Setup script for GitHub form storage
 * Run with: node setup-github-storage.js
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🚀 GitHub Form Storage Setup\n');
  
  // Check if .env.local already exists
  if (existsSync('.env.local')) {
    const overwrite = await question('.env.local already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      rl.close();
      return;
    }
  }

  console.log('Please provide the following information:\n');

  const token = await question('GitHub Personal Access Token: ');
  const owner = await question('GitHub Username (default: gowsi-08): ') || 'gowsi-08';
  const repo = await question('Repository Name (default: portfolio-responses): ') || 'portfolio-responses';
  const branch = await question('Branch Name (default: main): ') || 'main';

  // Create .env.local file
  const envContent = `# GitHub Configuration for Form Storage
VITE_GITHUB_TOKEN=${token}
VITE_GITHUB_OWNER=${owner}
VITE_GITHUB_REPO=${repo}
VITE_GITHUB_BRANCH=${branch}
`;

  writeFileSync('.env.local', envContent);
  
  console.log('\n✅ .env.local created successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Create a private GitHub repository:', `https://github.com/new`);
  console.log('2. Repository name:', repo);
  console.log('3. Make it private to keep form submissions secure');
  console.log('4. Run: npm run dev');
  console.log('5. Test the contact form');
  console.log('6. Check your repository for the responses/ folder');
  console.log('\n🔒 Security reminder: Never commit .env.local to your repository!');
  
  rl.close();
}

main().catch(console.error);