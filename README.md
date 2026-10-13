# DecsCV — One Form → Resume OR Portfolio Website

> Live at `cv.decslab.in`. Public profiles at `cv.decslab.in/{username}`.

DecsCV is an ultra-fast career builder built specifically for Indian college students, fresh graduates, and builders. A single guided form powers both an ATS-compliant placement A4 resume and a high-performance portfolio website with 8 visual engines.

---

## 🎨 8 Distinct Portfolio Visual Engines

1. **Noir Neon (`noir`)**: Flagship dark engine with cursor spotlight, Unbounded display letters, dual-row marquee, and pinned horizontal works gallery.
2. **Paper (`paper`)**: Quiet literary minimal aesthetic, Fraunces drop-cap, numbered footnotes, and table-of-contents sidebar.
3. **Terminal (`terminal`)**: Interactive developer CLI window with real interactive commands (`whoami`, `about`, `projects`, `skills`, `contact`), ASCII skill progress bars, and CRT toggle.
4. **Bento (`bento`)**: 12-column dynamic tile grid with interactive modal expansions, status indicators, and clean card depth.
5. **Brutal (`brutal`)**: Neo-brutalist raw 4px solid borders, hard 8px offset shadows, -3° rotated sticker labels, and diagonal marquee tape.
6. **Gazette (`gazette`)**: Editorial vintage newspaper with masthead ("The {Name} Times"), multi-column article layout, and classifieds contact section.
7. **Arcade (`arcade`)**: 8-bit retro gaming HUD with blinking "PRESS START" title screen, quest log experience, level-select cards, synthesized WebAudio sound blips, and Konami code easter egg.
8. **Blueprint (`blueprint`)**: Architectural CAD drawing sheet with technical registration marks, bottom-right title block, dimension lines, and component legend tables.

---

## 📄 3 ATS-Safe A4 Resume Templates

- **`classic`**: Traditional serif, single column, clean rules.
- **`modern`**: Familjen Grotesk, accent color bar, structured skills block.
- **`compact`**: Dense one-pager with small caps section labels, ideal for college campus placement drives.

Print stylesheet with `@media print` and dedicated print preview at `/{username}/resume`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 App Router, TypeScript (Strict), Tailwind CSS
- **Design System**: Warm paper (`#F3EEE3`) meets hacker zine with 2px hard ink borders and offset shadows (`4px 4px 0 var(--ink)`)
- **Typography**: `next/font/google` self-hosted (Bricolage Grotesque, Instrument Serif, Familjen Grotesk, JetBrains Mono, Unbounded, Space Grotesk, Fraunces, IBM Plex Mono, Manrope, Archivo Black, DM Serif Display, Press Start 2P, VT323, Syne)
- **Icons**: Phosphor Icons (no generic emojis)
- **Form & Validation**: `react-hook-form` + `zod`
- **Testing**: Vitest for unit tests
- **Authentication & Backend**: Firebase Auth, Firestore, Storage, and `firebase-admin`

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run Vitest unit tests**:
   ```bash
   npm run test
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment to Vercel & Domain Setup (`cv.decslab.in`)

1. **Push repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: DecsCV production release"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and import the repository.
   - Add environment variables from `.env.example` in the Vercel project settings.
   - Click **Deploy**.

3. **Configure Custom Domain (`cv.decslab.in`)**:
   - In your Vercel project settings, navigate to **Domains**.
   - Enter `cv.decslab.in` and click **Add**.
   - In your DNS provider (e.g. Cloudflare or your registrar), add a `CNAME` record:
     - **Type**: `CNAME`
     - **Name**: `cv`
     - **Target**: `cname.vercel-dns.com`
   - SSL certificates are automatically provisioned.

---

## 🛡️ Security & Privacy

- Strict input sanitization with no `dangerouslySetInnerHTML`.
- URL protocol validation (`http://` and `https://` only; `javascript:` and `data:` URIs blocked).
- Firestore security rules with owner-only mutation constraints and server-controlled analytics (`firestore.rules`).
- Storage security rules restricting uploads to authenticated users with image mime validation and `< 2MB` payload limit (`storage.rules`).
