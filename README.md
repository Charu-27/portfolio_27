# Portfolio

This is **Charu Jain’s** personal portfolio — a single scrolling page with work history (including Reliance Jio), projects, skills, and contact details, with light motion between sections.

## Content updates

Almost all copy and links live in **`src/data/portfolioData.ts`**. Edit that file to change the site; you rarely need to touch layout components.

---

## Tech stack (this project)

| Purpose | Tool |
| ------- | ---- |
| UI | React |
| Local dev & bundling | Vite |
| Animation | Framer Motion |
| Styling | CSS (`src/index.css`) |

---

## Run locally

1. Install **Node.js** (18+ recommended).
2. From the project folder:

   ```bash
   npm install
   npm run dev
   ```

3. Open **http://localhost:5173** (or the URL Vite prints if the port is busy).

---

## Production build

```bash
npm run build
```

Output is in **`dist/`**. Preview it with:

```bash
npm run preview
```

---

## Customisation

- **Profile, experience, projects, skills:** `src/data/portfolioData.ts`
- **Resume:** set `resumeUrl` in that file, or add `public/resume.pdf` and link to `/resume.pdf`
- **Theme:** colour tokens under `:root` in `src/index.css`

---

## Featured projects (from data)

| Project | Links |
| ------- | ----- |
| Expense Tracker | [GitHub](https://github.com/Charu-27/expense-tracker) · [Live](https://expensetracker-pi-two.vercel.app/) |
| Doc Pocket | [GitHub](https://github.com/Charu-27/Doc_Pocket) · [Live](https://doc-pocket.vercel.app) |

---

## Lint

```bash
npm run lint
```
