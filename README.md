# Bongani Mngomezulu — Portfolio

A modern, dark-mode portfolio built with React + Vite. Terminal/sysadmin aesthetic with animated typing intro, skill meters, experience changelog, education section and a contact form.

## Tech stack

- React 18
- Vite 5
- lucide-react (icons)
- JetBrains Mono + Inter (Google Fonts)

## Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying to GitHub Pages

1. Install the GitHub Pages plugin:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to `package.json` scripts:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Add `base` to `vite.config.js`:
   ```js
   base: '/portfolio/',
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

Your site will be live at `https://<your-github-username>.github.io/portfolio/`

## Project structure

```
portfolio/
├── public/
│   └── profile.jpg        # Profile photo
├── src/
│   ├── App.jsx            # Main portfolio component
│   └── main.jsx           # React entry point
├── index.html
├── vite.config.js
└── package.json
```

## Contact

- Email: mabongahbongani420@gmail.com
- LinkedIn: [linkedin.com/in/bongani-mngomezulu-08b68b235](https://www.linkedin.com/in/bongani-mngomezulu-08b68b235/)
