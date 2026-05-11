/**
 * GitHub Storage Utility
 * Stores form submissions as JSON files in a GitHub repository
 */

// Configuration - Update these values or use environment variables
const GITHUB_CONFIG = {
  owner: import.meta.env.VITE_GITHUB_OWNER || 'gowsi-08', // Your GitHub username
  repo: import.meta.env.VITE_GITHUB_REPO || 'portfolio-responses', // Repository name for storing responses
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main', // Branch to commit to
  token: import.meta.env.VITE_GITHUB_TOKEN, // GitHub Personal Access Token
};

/**
 * Create a new file in GitHub repository with form response
 * @param {Object} formData - The form submission data
 * @returns {Promise<boolean>} - Success status
 */
export async function saveToGitHub(formData) {
  try {
    const timestamp = new Date().toISOString();
    const filename = `responses/${Date.now()}-${formData.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    
    const content = {
      ...formData,
      timestamp,
      id: Date.now(),
    };

    const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${filename}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_CONFIG.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `New contact form submission from ${formData.name}`,
        content: btoa(JSON.stringify(content, null, 2)), // Base64 encode the content
        branch: GITHUB_CONFIG.branch,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('GitHub API Error:', error);
      throw new Error(`GitHub API error: ${response.status}`);
    }

    console.log('✅ Form response saved to GitHub successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to save to GitHub:', error);
    throw error;
  }
}

/**
 * Fetch all responses from GitHub repository
 * @returns {Promise<Array>} - Array of form responses
 */
export async function fetchResponsesFromGitHub() {
  try {
    // Get list of files in responses directory
    const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/responses`, {
      headers: {
        'Authorization': `token ${GITHUB_CONFIG.token}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch responses: ${response.status}`);
    }

    const files = await response.json();
    const responses = [];

    // Fetch content of each file
    for (const file of files) {
      if (file.name.endsWith('.json')) {
        const fileResponse = await fetch(file.download_url);
        const content = await fileResponse.json();
        responses.push({
          ...content,
          filename: file.name,
          sha: file.sha, // For deletion if needed
        });
      }
    }

    return responses.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  } catch (error) {
    console.error('❌ Failed to fetch responses from GitHub:', error);
    return [];
  }
}

/**
 * Delete a response file from GitHub repository
 * @param {string} filename - Name of the file to delete
 * @param {string} sha - SHA of the file (required for deletion)
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteResponseFromGitHub(filename, sha) {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/responses/${filename}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${GITHUB_CONFIG.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        message: `Delete response: ${filename}`,
        sha: sha,
        branch: GITHUB_CONFIG.branch,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete response: ${response.status}`);
    }

    console.log('✅ Response deleted from GitHub successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to delete from GitHub:', error);
    throw error;
  }
}