# SIH-2025 - STEMQuest

A gamified STEM learning platform built with React, Vite, and Tailwind CSS.

## 🚀 Deployment

This project is now configured for easy deployment to multiple platforms:

### GitHub Pages

1. Go to your repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to the `main` branch, and the site will automatically deploy
4. Your site will be available at: `https://username.github.io/repository-name/`

The GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured and will run automatically.

### Netlify

#### Option 1: Connect via Netlify Dashboard
1. Log in to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Netlify will auto-detect the `netlify.toml` configuration
5. Click "Deploy site"

#### Option 2: Deploy from Command Line
```bash
npm install -g netlify-cli
cd sangyaan
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

#### Option 1: Connect via Vercel Dashboard
1. Log in to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the `vercel.json` configuration
5. Click "Deploy"

#### Option 2: Deploy from Command Line
```bash
npm install -g vercel
vercel --prod
```

### Other Static Hosting Platforms

The site can be deployed to any static hosting platform (Cloudflare Pages, Render, Firebase Hosting, etc.):

1. Build the project:
   ```bash
   cd sangyaan
   npm install
   npm run build
   ```

2. Upload the contents of `sangyaan/dist/` to your hosting platform

## 🛠️ Local Development

```bash
cd sangyaan
npm install
npm run dev
```

## 📁 Project Structure

- `sangyaan/` - Main React application
- `cloud/` - Backend/cloud functions
- `design/` - Design assets and prototypes
- `files/` - Documentation and data files

## 🔧 Configuration

- `vite.config.js` - Vite build configuration with relative paths for deployment
- `netlify.toml` - Netlify deployment configuration
- `vercel.json` - Vercel deployment configuration
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow

## ⚡ Key Features

- Progressive Web App (PWA) support
- Offline functionality with Service Workers
- Responsive design for all devices
- Multi-language support
- Interactive STEM learning modules

## 📝 License

See repository for license information.
