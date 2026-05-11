# Portfolio Website

A production-grade portfolio for a Computer Science fresher, built with **React 18 + Vite**.  
All content is driven by a single YAML file — no databases, no hardcoded strings.  
**Contact form responses are stored directly in your GitHub repository** — no backend server required!

---

## ✨ Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 18 + Vite |
| Data | `js-yaml` (YAML parsed at runtime) |
| Form Storage | GitHub API (serverless) |
| Animations | Framer Motion |
| Icons | `react-icons`, Devicons CDN |
| Styling | CSS Modules + CSS Custom Properties |

---

## 🗂️ Project Structure

```
src/
  data/
    portfolio.yaml          ← ALL content lives here
  hooks/
    usePortfolioData.js     ← Parses YAML, returns data object
  components/
    Navbar.jsx / .module.css
    Hero.jsx / .module.css
    About.jsx / .module.css
    Skills.jsx / .module.css
    Experience.jsx / .module.css
    Projects.jsx / .module.css
    CodingPlatforms.jsx / .module.css
    Achievements.jsx / .module.css
    Education.jsx / .module.css
    Contact.jsx / .module.css
    Footer.jsx / .module.css
  App.jsx
  main.jsx
  index.css
```

---

## 🚀 Getting Started

### Prerequisites
1. **GitHub Repository**: Create a private repository for storing form responses
2. **GitHub Token**: Generate a Personal Access Token with `repo` permissions
3. **Environment Setup**: Copy `.env.example` to `.env.local` and add your token

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for detailed setup instructions.

### Quick Start
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your VITE_GITHUB_TOKEN

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## ✏️ How to Update Your Portfolio

**Everything lives in `src/data/portfolio.yaml`.**  
Edit the YAML and the site automatically reflects your changes on the next build/reload.

### Changing Your Name, Tagline, Links

```yaml
personal:
  name: "Your Full Name"
  tagline: "Your Tagline"
  github: "https://github.com/yourusername"
  linkedin: "https://linkedin.com/in/yourusername"
  email: "you@example.com"
  resume_url: "/resume.pdf"   # place your PDF in /public/resume.pdf
  open_to_work: true          # set false to hide the badge
```

### Adding a Skill

```yaml
skills:
  - category: "Languages"
    icon: "💻"
    items:
      - name: "Rust"
        icon: "devicon-rust-plain"   # or any devicon class
        level: 65                    # 0–100
```

Find devicon class names at: https://devicon.dev

### Adding a Project

```yaml
projects:
  - title: "My New Project"
    description: "A short description of what it does."
    tech_stack: ["React", "FastAPI", "PostgreSQL"]
    github_url: "https://github.com/you/project"
    live_url: "https://project.vercel.app"
    featured: true      # shows in the featured section
    thumbnail: "🚀"     # emoji displayed as the project icon
```

### Adding a Coding Platform

```yaml
coding_platforms:
  - platform: "AtCoder"
    username: "your_handle"
    problems_solved: 120
    rating: 1200
    rank: "Brown"
    profile_url: "https://atcoder.jp/users/your_handle"
    badge_color: "#804000"
    icon: "🟫"
```

### Adding a Certification / Achievement

```yaml
achievements:
  - title: "Google Cloud Professional"
    issuer: "Google"
    date: "Jan 2025"
    credential_url: "https://google.com/verify/xxx"
    icon: "☁️"
    type: "certification"   # "certification" or "achievement"
```

### Adding Experience

```yaml
experience:
  - company: "Company Name"
    role: "Software Engineering Intern"
    duration: "Jun 2025 – Aug 2025"
    location: "City, Country (Remote/Hybrid)"
    logo_color: "#FF6B35"    # brand color for the timeline dot
    description:
      - "Bullet point one about what you did."
      - "Quantified achievement — reduced latency by 30%."
    tech_stack: ["React", "Node.js", "AWS"]
```

---

## 🖼️ Adding Your Photo

Replace the `avatar_url` in `portfolio.yaml` with:
- A hosted image URL (GitHub profile, Cloudinary, etc.)
- Or move your photo to `/public/avatar.jpg` and use `avatar_url: "/avatar.jpg"`

## 📄 Adding Your Resume

1. Place `resume.pdf` in the `/public` folder
2. Ensure `resume_url: "/resume.pdf"` in `portfolio.yaml`

The "Download Resume" button in the Hero will automatically link to it.

---

## 📬 Contact Form & GitHub Storage

The contact form now stores submissions directly in your GitHub repository:

- **No Backend Required**: Uses GitHub API for serverless form storage
- **Secure**: Responses stored in a private GitHub repository
- **Admin Panel**: Access responses at `/#admin` with your password
- **Export**: Download responses as CSV from the admin panel

### Setup Contact Form Storage

1. **Create Repository**: Make a private GitHub repo (e.g., `portfolio-responses`)
2. **Generate Token**: Create a GitHub Personal Access Token with `repo` permissions
3. **Configure**: Add `VITE_GITHUB_TOKEN=your_token` to `.env.local`
4. **Deploy**: Add the token as an environment variable in your deployment platform

See [GITHUB_SETUP.md](./GITHUB_SETUP.md) for complete setup instructions.

---

## 🚢 Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# drag-and-drop the /dist folder to netlify.com
```

### GitHub Pages
```bash
npm run build
# push /dist to gh-pages branch
```
