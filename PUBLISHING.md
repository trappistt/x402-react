# Publishing Guide

## Before Publishing

### 1. Package Name Consideration

The package is currently named `@micropay/react` (scoped package). You have three options:

**Option A: Create an npm organization** (Recommended if you want to keep the scope)
```bash
# Create organization at https://www.npmjs.com/org/create
# Then publish with:
npm publish --access public
```

**Option B: Use your username scope**
```bash
# Change package.json name to: "@YOUR_NPM_USERNAME/react"
# Then publish with:
npm publish --access public
```

**Option C: Use unscoped name**
```bash
# Change package.json name to: "micropay-react"
# Then publish with:
npm publish
```

### 2. Update package.json

Before publishing, update these fields in `package.json`:
- `author`: Add your name/email (e.g., `"Your Name <your.email@example.com>"`)
- `repository.url`: Update with your actual GitHub repository URL
- `bugs.url`: Update with your actual repository issues URL
- `homepage`: Update with your actual repository homepage URL

### 3. Build the Package

```bash
npm run build
```

This will:
- Compile TypeScript
- Generate type definitions
- Bundle the library
- Create the `dist/` folder

### 4. Test the Build

Verify the build output:
```bash
ls -la dist/
```

You should see:
- `index.js` - Main bundle
- `index.d.ts` - TypeScript definitions
- `styles.css` - CSS file

### 5. Check Package Contents

See what will be published:
```bash
npm pack --dry-run
```

This shows exactly what files will be included in the published package.

## Publishing Steps

### 1. Login to npm

```bash
npm login
```

### 2. Verify You're Logged In

```bash
npm whoami
```

### 3. Publish the Package

**For scoped packages** (`@micropay/react`):
```bash
npm publish --access public
```

**For unscoped packages** (`micropay-react`):
```bash
npm publish
```

### 4. Verify Publication

Check your package on npm:
```bash
npm view @micropay/react
# or
npm view micropay-react
```

## After Publishing

### Update Version for Next Release

Use semantic versioning:
- `npm version patch` - for bug fixes (0.1.0 → 0.1.1)
- `npm version minor` - for new features (0.1.0 → 0.2.0)
- `npm version major` - for breaking changes (0.1.0 → 1.0.0)

Then publish again:
```bash
npm publish --access public
```

## Troubleshooting

### "Package name already exists"
- The name `@micropay/react` might be taken
- Try a different name or create the npm organization

### "You must verify your email"
- Check your npm email and verify it

### "403 Forbidden"
- Make sure you're logged in: `npm whoami`
- For scoped packages, use `--access public`

### Build Errors
- Run `npm install` first
- Check TypeScript errors: `npm run type-check`
- Ensure all dependencies are installed

## Recommended Workflow

1. Update `package.json` with your details
2. Build: `npm run build`
3. Test locally: `npm pack` and install in a test project
4. Login: `npm login`
5. Publish: `npm publish --access public`
6. Verify: Check npm registry

