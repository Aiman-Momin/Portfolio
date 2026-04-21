# Deploying to GitHub Pages

To deploy this portfolio to GitHub Pages, follow these steps:

## 1. Install `gh-pages`
```bash
npm install gh-pages --save-dev
```

## 2. Update `package.json`
Add the following properties to your `package.json`:

```json
{
  "homepage": "https://aiman-momin.github.io/Portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 3. Update `vite.config.ts`
Ensure the `base` property is set to your repository name:

```typescript
export default defineConfig({
  base: '/Portfolio/',
  // ... rest of your config
})
```

## 4. Deploy
Run the following command:
```bash
npm run deploy
```

Your site will be live at `https://aiman-momin.github.io/Portfolio/`.
