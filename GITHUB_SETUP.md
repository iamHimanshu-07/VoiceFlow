# GitHub Setup Guide

This guide will help you push VoiceFlow to GitHub and set up the repository properly.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `voiceflow`
   - **Description**: `AI-Powered Speech Recognition Web Application`
   - **Visibility**: Public (recommended) or Private
   - **Initialize with**: Leave empty (we'll push existing code)
   - **Add .gitignore**: None (already included)
   - **Add a license**: None (we have MIT License)

5. Click "Create repository"

## Step 2: Initialize and Push to GitHub

### Option A: Using Git (Recommended)

```bash
# Navigate to project directory
cd voiceflow

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial release of voiceflow v1.0.0

- Real-time speech recognition using Web Speech API
- Modern dark/light theme support
- Responsive mobile-first design
- Comprehensive documentation
- MIT License"

# Add remote repository
git remote add origin https://github.com/yourusername/voiceflow.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Option B: Using GitHub CLI

```bash
# Ensure you're logged in
gh auth login

# Create repository from directory
gh repo create voiceflow --source=. --remote=origin --push
```

## Step 3: Enable GitHub Features

### Branch Protection Rules

1. Go to Settings → Branches
2. Click "Add rule"
3. Configure:
   - **Branch name pattern**: `main`
   - ✅ Require pull request reviews before merging
   - ✅ Dismiss stale pull request approvals
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

### GitHub Pages (Optional)

1. Go to Settings → Pages
2. **Source**: Deploy from a branch
3. **Branch**: main
4. **Folder**: / (root) or /docs

### Enable Discussions

1. Go to Settings → General
2. Scroll to "Features"
3. ✅ Enable "Discussions"

### Enable Issues

1. Go to Settings → General
2. ✅ Keep "Issues" enabled

## Step 4: Add Topics and Metadata

1. Go to repository main page
2. Click "⚙️ Edit repository details"
3. Add topics:
   - `speech-recognition`
   - `voice-to-text`
   - `web-speech-api`
   - `nextjs`
   - `react`
   - `typescript`
   - `tailwindcss`

4. Add description and homepage URL

## Step 5: Configure GitHub Actions

The CI/CD workflow (`.github/workflows/ci.yml`) will automatically run on:
- Pushes to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

No additional setup needed!

## Step 6: Set Up Deployment

### Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Click "Deploy"

### Add Deployment Badge

Once deployed, add this to your README:

```markdown
[![Deployed on Vercel](https://vercel.com/button)](https://vercel.com/import?project-name=voiceflow&repository-url=https://github.com/yourusername/voiceflow)
```

## Step 7: Configure Branch Settings

1. **Default Branch**: Set to `main`
2. **Auto-delete branches**: Enable for merged PRs
3. **Protected branches**: Configure as shown above

## Step 8: Add Secrets (if needed)

1. Go to Settings → Secrets and variables → Actions
2. Add any required secrets:
   ```
   EXAMPLE_SECRET=your_secret_value
   ```

## Step 9: Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to main branch
- [ ] README.md is displaying correctly
- [ ] LICENSE file is visible
- [ ] Branch protection rules configured
- [ ] GitHub Actions CI/CD is running
- [ ] Vercel deployment configured
- [ ] Repository topics added
- [ ] Discussions enabled
- [ ] Homepage URL set

## Useful GitHub URLs

- **Repository**: `https://github.com/yourusername/voiceflow`
- **Issues**: `https://github.com/yourusername/voiceflow/issues`
- **Pull Requests**: `https://github.com/yourusername/voiceflow/pulls`
- **Settings**: `https://github.com/yourusername/voiceflow/settings`
- **Actions**: `https://github.com/yourusername/voiceflow/actions`
- **Releases**: `https://github.com/yourusername/voiceflow/releases`

## Common Git Commands

```bash
# Update with latest changes
git pull origin main

# Create a new branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push changes
git push origin feature/new-feature

# Create pull request
# Go to GitHub and create PR from your branch

# Delete local branch
git branch -d feature/new-feature

# Delete remote branch
git push origin --delete feature/new-feature
```

## Troubleshooting

### "fatal: not a git repository"
```bash
git init
```

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/voiceflow.git
```

### "permission denied" when pushing
```bash
# Add SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"
# Add public key to GitHub SSH settings
```

### "branch 'main' set up to track 'origin/main'"
```bash
git branch -u origin/main main
```

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Set up Vercel deployment
3. ✅ Configure GitHub branch protection
4. ✅ Enable GitHub Actions CI/CD
5. 📢 Share the project!

---

For more help, see:
- [GitHub Documentation](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [Vercel Documentation](https://vercel.com/docs)
