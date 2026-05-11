# GitHub Form Storage Setup Guide

This portfolio now stores contact form submissions directly in your GitHub repository instead of using a backend server. Follow these steps to set it up:

## 1. Create a GitHub Repository for Responses

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `portfolio-responses` (or any name you prefer)
3. Make it **private** to keep form submissions secure
4. Initialize with a README (optional)

## 2. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Portfolio Form Storage"
4. Set expiration (recommend 1 year or no expiration)
5. Select the following scopes:
   - ✅ **repo** (Full control of private repositories)
   - ✅ **repo:status** (Access commit status)
   - ✅ **public_repo** (Access public repositories) - if your repo is public

6. Click "Generate token"
7. **Copy the token immediately** - you won't be able to see it again!

## 3. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your GitHub token:
   ```env
   VITE_GITHUB_TOKEN=ghp_your_token_here
   ```

3. Optional: Override default settings:
   ```env
   VITE_GITHUB_OWNER=your-username
   VITE_GITHUB_REPO=your-repo-name
   VITE_GITHUB_BRANCH=main
   ```

## 4. Update Repository Settings (if needed)

If you want to use different repository settings, edit `src/utils/githubStorage.js`:

```javascript
const GITHUB_CONFIG = {
  owner: 'your-username',
  repo: 'your-repo-name',
  branch: 'main',
  token: import.meta.env.VITE_GITHUB_TOKEN,
};
```

## 5. Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Go to the contact section and submit a test form
3. Check your GitHub repository - you should see a new `responses/` folder with JSON files
4. Test the admin panel at `/#admin` using your password from `portfolio.yaml`

## 6. Deploy with Environment Variables

### Vercel
1. Go to your Vercel project settings
2. Add environment variable: `VITE_GITHUB_TOKEN` with your token value

### Netlify
1. Go to Site settings > Environment variables
2. Add `VITE_GITHUB_TOKEN` with your token value

### Other Platforms
Add the `VITE_GITHUB_TOKEN` environment variable in your deployment platform's settings.

## How It Works

- **Form Submission**: When someone submits the contact form, it creates a JSON file in your repository's `responses/` folder
- **File Naming**: Files are named with timestamp and sender name: `1234567890-john-doe.json`
- **Admin Panel**: The admin panel fetches all response files from GitHub and displays them
- **Security**: Your GitHub token is kept in environment variables and never exposed in the code

## File Structure in Repository

```
portfolio-responses/
└── responses/
    ├── 1640995200000-john-doe.json
    ├── 1640995300000-jane-smith.json
    └── ...
```

Each JSON file contains:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss...",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "id": 1640995200000
}
```

## Security Notes

- Keep your GitHub token secure and never commit it to your repository
- Use a private repository for storing form responses
- The admin password is still stored in `portfolio.yaml` - consider this when making your portfolio repository public
- Regularly rotate your GitHub token for security

## Troubleshooting

### "Failed to save to GitHub" Error
- Check that your GitHub token is valid and has the correct permissions
- Verify the repository name and owner are correct
- Ensure the repository exists and is accessible

### Admin Panel Shows "Cannot fetch responses"
- Verify your GitHub token has `repo` permissions
- Check that the repository and `responses/` folder exist
- Look at browser console for detailed error messages

### Token Expired
- Generate a new token following step 2
- Update your environment variables with the new token
- Redeploy your application

## Benefits of GitHub Storage

✅ **No Backend Required**: Eliminates the need for a server and database  
✅ **Version Control**: All form submissions are version controlled  
✅ **Free**: Uses GitHub's free tier for storage  
✅ **Secure**: Private repository keeps submissions secure  
✅ **Backup**: Automatic backup through Git history  
✅ **Portable**: Easy to migrate or backup all responses  

## Migration from Backend

If you were previously using the Express.js backend:

1. Export existing responses from the admin panel (CSV download)
2. Remove the `server/` folder
3. Update your deployment to only build the frontend
4. Remove backend-related environment variables from your deployment platform