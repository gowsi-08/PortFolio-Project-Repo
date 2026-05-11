#!/usr/bin/env node

/**
 * Test script to verify GitHub API connection
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

const GITHUB_CONFIG = {
  owner: process.env.VITE_GITHUB_OWNER || 'gowsi-08',
  repo: process.env.VITE_GITHUB_REPO || 'PortFolio-Form-Response',
  branch: process.env.VITE_GITHUB_BRANCH || 'main',
  token: process.env.VITE_GITHUB_TOKEN,
};

async function testConnection() {
  console.log('🔍 Testing GitHub API connection...\n');
  
  console.log('Configuration:');
  console.log(`- Owner: ${GITHUB_CONFIG.owner}`);
  console.log(`- Repository: ${GITHUB_CONFIG.repo}`);
  console.log(`- Branch: ${GITHUB_CONFIG.branch}`);
  console.log(`- Token: ${GITHUB_CONFIG.token ? '✅ Present' : '❌ Missing'}\n`);

  if (!GITHUB_CONFIG.token) {
    console.log('❌ GitHub token is missing. Please check your .env.local file.');
    return;
  }

  try {
    // Test 1: Check if repository exists
    console.log('1. Checking repository access...');
    const repoResponse = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`, {
      headers: {
        'Authorization': `token ${GITHUB_CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (repoResponse.ok) {
      const repoData = await repoResponse.json();
      console.log(`✅ Repository found: ${repoData.full_name}`);
      console.log(`   - Private: ${repoData.private}`);
      console.log(`   - Default branch: ${repoData.default_branch}`);
    } else {
      const error = await repoResponse.json();
      console.log(`❌ Repository access failed (${repoResponse.status}):`, error.message);
      
      if (repoResponse.status === 404) {
        console.log('\n💡 Solution: Create the repository at https://github.com/new');
        console.log(`   Repository name: ${GITHUB_CONFIG.repo}`);
        console.log('   Make it private for security');
      }
      return;
    }

    // Test 2: Try to create a test file
    console.log('\n2. Testing file creation...');
    const testContent = {
      test: true,
      timestamp: new Date().toISOString(),
      message: 'GitHub API connection test'
    };

    const createResponse = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/test-connection.json`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_CONFIG.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: 'Test GitHub API connection',
        content: btoa(JSON.stringify(testContent, null, 2)),
        branch: GITHUB_CONFIG.branch,
      }),
    });

    if (createResponse.ok) {
      console.log('✅ File creation successful!');
      console.log('✅ GitHub integration is working correctly');
      
      // Clean up test file
      const createData = await createResponse.json();
      await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/test-connection.json`, {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${GITHUB_CONFIG.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Clean up test file',
          sha: createData.content.sha,
          branch: GITHUB_CONFIG.branch,
        }),
      });
      console.log('🧹 Test file cleaned up');
      
    } else {
      const error = await createResponse.json();
      console.log(`❌ File creation failed (${createResponse.status}):`, error.message);
    }

  } catch (error) {
    console.log('❌ Connection test failed:', error.message);
  }
}

testConnection().catch(console.error);