# Portfolio

## What this is

This is **Charu Jain’s** personal portfolio website — a single scrolling page that shows work history (including time at Reliance Jio), sample projects, skills, and how to get in touch.

The page is built to feel smooth when you move between sections, with light animation.

## How updates work

Almost all of the wording and links are in **one file** (`src/data/portfolioData.ts`). You change that file to update the site; you usually do not need to edit the page layout.

---

## Tools used to build the site

| What it’s for | What we use |
| ------------- | ----------- |
| Pages and interactivity | React |
| Safer, structured code | TypeScript |
| Running the site while you work | Vite |
| Motion and transitions | Framer Motion |
| Colors and layout | CSS (main styles in `src/index.css`) |

---

## Run the site on your computer

1. **Install Node.js** if you don’t have it yet. Version 18 or newer is a good choice.

2. **Install project dependencies** (one time, from the project folder):

   ```bash
   npm install
   ```

3. **Start the local preview:**

   ```bash
   npm run dev
   ```

4. Open your browser at **[http://localhost:5173](http://localhost:5173)**.

---

## Put the site online (build)

When you want the files you can upload to hosting:

```bash
npm run build
```

The ready-to-publish files appear in the **`dist`** folder.

To double-check that build on your machine before publishing:

```bash
npm run preview
```

---

## Change the content

**Your profile and sections**  
Open `src/data/portfolioData.ts` and edit the text there:

- Personal details: name, job title, short bio, email, phone, social links  
- Work experience, projects, and skills lists  

**Resume link**  
In that same file, set the resume link to your Google Drive file, or put a PDF named something like `resume.pdf` in the **`public`** folder and link to it.

**Colors**  
Open `src/index.css` and change the color values at the top (under `:root`) — for example the main and accent colors — until they match what you want.

**Adding another project**  
Find the projects list in `portfolioData.ts`, copy an existing project entry, paste it below, and change the names, descriptions, and links. Following the same pattern as the other entries keeps everything working.

---

## Sample projects shown on the site

These are examples listed in the data file; you can replace them with your own.

| Project | What it is | Links |
| ------- | ---------- | ----- |
| Expense Tracker | Expense tracking app | [GitHub](https://github.com/Charu-27/expense-tracker) · [Live demo](https://expensetracker-pi-two.vercel.app/) |
| Doc Pocket | Document storage app | [GitHub](https://github.com/Charu-27/Doc_Pocket) · [Live demo](https://doc-pocket.vercel.app) |

---

## Optional: code checks

If you want to run the project’s automated style checks:

```bash
npm run lint
```
