# Setting Up npm link with nvm - Avoiding Permission Issues

## The Problem

When trying to use `npm link` to test package changes locally, you may encounter permission errors like:

```
npm error code EACCES
npm error syscall mkdir
npm error path /usr/local/lib/node_modules/@communitiesuk
npm error errno -13
npm error Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/@communitiesuk'
```

## Why This Happens

### System-wide installs go under a protected directory

- **System Node.js installation** (via Homebrew, installer, etc.) puts global packages in `/usr/local/lib/node_modules/`
- Node and npm executables go in `/usr/local/bin/`
- On macOS and Linux, `/usr/local` is owned by the **root user** (superuser/administrator)
- Your normal login account has **no write permission** there
- That's why `npm link` (running as you, the unprivileged user) gets blocked with `EACCES: permission denied`

### What "running as root" means and why it's dangerous

- **"root"** is the built-in superuser account with unrestricted access to all files
- `sudo npm link` tells the shell "run this command as root" - bypassing permission checks
- **Security risk:** npm scripts can execute malicious code with full system privileges
- **Permission conflicts:** Files created as root are owned by root, causing future headaches

## The Solution: nvm (Node Version Manager)

### nvm installs everything under your home directory

- nvm lives in `~/.nvm/` (where `~` expands to `/Users/your-account` on macOS)
- `nvm install` downloads Node into `~/.nvm/versions/node/v24.3.0/bin/node` (and matching npm)
- **Because you own your home folder**, npm can freely write, link, or update files there without special privileges
- This eliminates permission issues entirely

## Step-by-Step Setup based on these instructions: https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/#heading-how-to-install-nvm-on-linux-and-mac

### Step 1: Install nvm

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

**How to find the latest version:** Check the [nvm releases page](https://github.com/nvm-sh/nvm/releases) on GitHub to get the most recent version number. Replace `v0.39.0` in the command above with the latest version (e.g., `v0.39.1`).

**What these commands do:**
- curl is a simple, command-line tool for fetching (or “transferring”) data over the internet.
- `curl` or `wget` downloads the installation script from GitHub
- The `|` (pipe) sends the downloaded script directly to `bash` to execute it
- This downloads and runs the nvm installer in one command

You can also use `wget` if `curl` is not available (some minimal Linux systems don't include curl by default, which isn't an issue on our teams Mac OS):

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

**Why this step:** Downloads and installs nvm to `~/.nvm/` directory, which is owned by your user.

### Step 2: Configure Shell Auto-loading (Using .zprofile)

```bash
touch ~/.zprofile
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zprofile
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zprofile
echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> ~/.zprofile
```

**Why .zprofile instead of .zshrc:**

- `.zshrc` files are sometimes owned by root, causing permission errors
- `.zprofile` runs once per login session (perfect for environment setup)
- We can create `.zprofile` fresh without permission issues

**Why this step:** Without this configuration, you'd need to manually run this long command every time you open a new terminal:

```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

This command loads nvm into your shell session. Without it, your terminal defaults back to the system Node.js (`/usr/local/bin/node`) and you'd get permission errors again. The `.zprofile` configuration runs this automatically on login.

### Step 3: Load nvm and Install Node.js

```bash
source ~/.zprofile
nvm install node
```

**Why this step:**

- `source ~/.zprofile` loads nvm in the current session
- `nvm install node` installs the latest Node.js version in `~/.nvm/versions/node/`
- This Node.js installation has proper user permissions

### Step 4: Verify Setup

```bash
which node && node --version
# Should show: /Users/[username]/.nvm/versions/node/v[version]/bin/node
```

**Why this verification:** Confirms you're using nvm's Node.js (user directory) instead of system Node.js (`/usr/local/bin/node`).

### Step 5: Use npm link (Component Library)

```bash
cd /path/to/component-library
npm run build # Build the package first
npm link         # Create link
```

**Why npm run build first:** Ensures the `dist/` directory is up-to-date with your latest changes.

### Step 6: Link in Test Project

```bash
cd /path/to/test-project or just open vs code window with project open
npm link @communitiesuk/svelte-component-library
```

**Why this works:** nvm's npm installs global packages in `~/.nvm/versions/node/v[version]/lib/node_modules/` which is user-writable.

## Troubleshooting

### If you get permission errors on .zshrc:

- **Problem:** `.zshrc` owned by root
- **Solution:** Use `.zprofile` instead (as shown above)

### If nvm doesn't load in new terminals:

- **Problem:** Configuration not applied
- **Solution:** Run `source ~/.zprofile` or restart Terminal app

### If you're still using system Node.js:

- **Check:** Run `which node` - should show nvm path, not `/usr/local/bin/node`
- **Fix:** Run `source ~/.zprofile` to load nvm

## Alternative: npm pack Method

If nvm setup is too complex, you can use the simpler `npm pack` approach:

```bash
# In component library
npm run build
npm pack

# This creates: communitiesuk-svelte-component-library-[version].tgz

# In test project
npm install /path/to/communitiesuk-svelte-component-library-[version].tgz
```

**Trade-offs:**

- Good **Simpler:** No system configuration needed
- Good **Safe:** No permission issues
- Bad **Manual:** Need to recreate tarball for each change
- Bad **Cleanup:** Need to manually uninstall/reinstall for updates

## Security Note

**Never use `sudo npm`** for regular operations:

- Bad `sudo npm link` - Security risk
- Bad `sudo npm install -g` - Creates permission conflicts
- Good Use nvm instead for a secure, user-owned Node.js environment

## Summary

This nvm approach provides:

- **Security:** No root privileges needed
- **Convenience:** Auto-loads in new terminals
- **Isolation:** Doesn't interfere with system Node.js
- **Flexibility:** Easy to switch Node.js versions if needed

The setup takes a few minutes but eliminates permission issue in long term.
