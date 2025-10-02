# SANGYAAN - Smart Education Infrastructure for Digital India

SANGYAAN is a unified digital backbone designed to address the fragmentation of India's education ecosystem by connecting students, teachers, institutions, industries, and government within one interoperable platform. Aligned with NEP 2020, it ensures equal opportunities for rural and urban learners, moving beyond marks to track progress through merit, projects, and verified achievements.

## 🎯 About SANGYAAN

The idea of SANGYAAN is to streamline the fragmented parts of India's education system, each with its own problems, while closely following the vision of NEP 2020. What we need is not another app, but a digital infrastructure that gives equal opportunities to rural schools and colleges, and that tracks student progress not just by marks, but also through merit, achievements, and real contributions.

When we first started thinking about Sangyaan, the frustration was simple: India already has all the right pieces — schools, colleges, skilling centers, industries, and government schemes — but they exist in pieces. A student earns marks in school, enters college, learns some more, maybe picks up a certificate or two, and eventually looks for a job. But at every stage, the data is fragmented, the learning is generic, and there is no portable proof of skills that can be trusted across systems.

### Key Innovation

Our idea was to design a digital backbone that ties all of these players together. Imagine a platform where a student's journey — whether it's a quiz in class 8, a project in semester 5, or an internship with a local company — all flows into a single, verifiable digital profile. Teachers can upload their own content in their own language, without complicated tools. Colleges and schools can integrate seamlessly with national databases like UDISE+ or NSDC. Industries can push projects, hackathons, and internships directly into the ecosystem through APIs. And government bodies can monitor real-time trends — seeing where skills are strong, where dropouts are happening, and where interventions are most needed.

The key to making this engaging is gamification and adaptive learning. Instead of treating education as a monotonous march of textbooks and exams, Sangyaan layers in battles, challenges, badges, and events. But it's not gamification for the sake of fun — achievements are tied to OpenBadges 3.0, cryptographically secure and portable, so a badge earned in school can later matter in college admissions or even in a job portfolio.

## 🎥 Demo & Resources

**Watch our YouTube playlist:** [SANGYAAN Demo & Overview](https://www.youtube.com/playlist?list=PLWABiP-xXAul-FRsqtXUvB1ylOcRmHPUD)

## 🌐 Live Deployments

- **GitHub Pages:** [https://ng196.github.io/SIH-2025/](https://ng196.github.io/SIH-2025/)
- **Netlify:** [Coming soon - Deploy your own instance!]

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

- **Unified Digital Profile**: Track student journey from school to employment with verifiable credentials
- **Gamification & Adaptive Learning**: Battles, challenges, badges tied to OpenBadges 3.0
- **Multi-stakeholder Platform**: Connects students, teachers, institutions, industries, and government
- **Offline-First Design**: Works in rural and low-bandwidth areas with downloadable content packs
- **AI-Powered Personalization**: Adaptive pathways based on pace, strengths, and aspirations
- **Multilingual Support**: Content creation and learning in multiple Indian languages
- **Secure Credentials**: OAuth, JWT, and cryptographic security for national-scale deployment
- **Progressive Web App (PWA)**: Mobile-first, offline functionality with Service Workers
- **Institution Management**: Simple dashboards for scheduling, attendance, and progress tracking
- **Industry Integration**: APIs for projects, hackathons, and internships
- **National Database Integration**: Seamless connection with UDISE+ and NSDC

## 📝 License

See repository for license information.
