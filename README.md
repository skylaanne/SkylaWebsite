# Skyla Urman — portfolio site

Live at **https://skylaanne.github.io/SkylaWebsite/**

A single-page portfolio built from the "Skyla Urman Portfolio" design canvas. It's plain HTML, CSS and JavaScript: no framework, no build step, no dependencies. It works on any static host.

```
.
├── README.md
├── .github/workflows/pages.yml   publishes site/ to GitHub Pages on every push to main
└── site/                         everything that goes live
    ├── index.html                the page (all copy lives here)
    ├── styles.css                design tokens, layout, motion, responsive rules
    ├── main.js                   menu, perspective toggle, ping, process reveal, contact form
    ├── privacy.html              privacy policy
    ├── 404.html                  not-found page
    ├── robots.txt
    └── assets/
        ├── favicon.svg           the square-and-circle mark
        └── img/                  project screenshots, 800px and 1440px widths
```

## Run it locally

```bash
python3 -m http.server 4173 --directory site
```

Then open http://localhost:4173.

## Before launch

Hidden placeholders are HTML comments in `index.html`. This lists them:

```bash
grep -n "uncomment\|To do\|Next thing" site/index.html
```

1. **Contact form: connected to Formspree** (form `myekbgde`). The endpoint appears twice on the `<form class="cform">` tag. `data-endpoint` is the one `main.js` sends to with `fetch`. `action` is used only if JavaScript fails to load: the browser then posts directly and Formspree shows its own thank-you page. If you ever change forms, update both. A few fields have special meaning to Formspree:
   - `email`: Formspree sets it as the reply-to address, so you can answer from your inbox.
   - `_subject`: the subject line of the notification email. Edit the hidden input to change it.
   - `_gotcha`: a hidden honeypot field. Submissions that fill it in are dropped as spam.

   **Test it once before launch.** Send a real message from the live site and confirm it reaches your inbox. In the Formspree dashboard, it's worth restricting the form to your domain once you have one.
2. **Email and profiles: done.** The contact section and footer link to skylaurman@gmail.com, LinkedIn and GitHub. There's no booking link. To add one, put another row in the `contact-list` in `index.html`.
3. **Privacy policy: done.** It's at `privacy.html`, linked from the footer and from a note under the contact form. It describes what the site does today: Formspree for the form, Gmail for replies, Google Fonts, and the host's standard server logs. Update it if you add analytics, a newsletter, or another service that handles visitor data.
4. **Project details.** Each project has a hidden "to confirm" row, commented out in `index.html`. Fill in the facts and remove the `<!-- … -->` around it, or delete the line.
5. **"Currently exploring".** Update the `updated Oct 2026` stamp whenever you change the list. A commented-out fourth row shows the markup for adding one.
6. **Sharing preview.** `og:url` is set. Add an `og:image` (1200×630) where the `To do` comment is in the `<head>`, so links shared on LinkedIn and elsewhere get a picture.
7. **Client sign-off: done.** Both clients approved being featured, including the salon screenshot with the owner's photo.

## Deploy

The site deploys itself. Every push to `main` runs `.github/workflows/pages.yml`, which publishes the `site/` folder to GitHub Pages at https://skylaanne.github.io/SkylaWebsite/. Progress shows in the repository's **Actions** tab, and a deploy takes about a minute.

```bash
git add -A
git commit -m "Describe the change"
git push
```

**Custom domain later.** Add it under the repository's Settings › Pages, follow GitHub's DNS instructions, and keep **Enforce HTTPS** on. Then update `og:url` in `index.html`, and restrict your Formspree form to the new domain.

The site is plain static files, so Netlify, Cloudflare Pages or Vercel also work: point them at the `site` folder, with no build command.

## Add a project

In `index.html`, copy one `<article class="proj">…</article>` block inside the Work section, and put it above the dashed "project 03 · reserved" block. Then:

- Change the `id` on the `<h3>` and the matching `aria-labelledby` on the `<article>`. They must be unique.
- Only the title, the preview image, the client line and the link are required. Delete any `<dt>`/`<dd>` pair you don't have, and the layout still holds.
- Add `proj--flip` to the article's class to put the preview on the right. Alternate it for rhythm.
- Add screenshots as `assets/img/<name>-800.jpg` and `<name>-1440.jpg`, at 16:10. One way to capture them with Chrome:

  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1440,900 --screenshot=shot.png https://example.com
  sips -s format jpeg -s formatOptions 70 -Z 1440 shot.png --out site/assets/img/example-1440.jpg
  sips -s format jpeg -s formatOptions 80 -Z 800 shot.png --out site/assets/img/example-800.jpg
  ```

- Write alt text that describes what the screenshot shows, not just "screenshot".
- **Live preview.** Set `data-live-src` (the site's URL) and `data-live-title` on the `<figure class="shot">`, and visitors can click "Try it live" to use the real site inside the frame. It only works if the site allows being embedded. Check with `curl -sI https://example.com | grep -i "x-frame-options\|frame-ancestors"`: no output means it's allowed. If it isn't allowed, remove the `data-live-*` attributes and the `shot-cover` button, and the frame stays a plain screenshot with its "Open" link.

Once you have three or more projects, the Patterns board on the design canvas shows the compact card grid for older work.

## Motion

Every animation follows the reviewed motion plans from the design canvas:

- **Shared curves:** `--ease-out` and `--ease-in-out` in `:root`. Interface transitions stay under 300ms.
- **Hover:** movement and tints apply only on devices with a real mouse, through `@media (hover: hover) and (pointer: fine)`, so nothing sticks after a tap.
- **Reduced motion:** the `prefers-reduced-motion` block at the end of `styles.css` removes all movement but keeps fades and color changes.
- **Process reveal:** it only hides the steps when JavaScript is running, using the `html.js` class. It plays once, the first time the section is a fifth visible.

When you add motion, reuse the tokens. Animate only `transform` and `opacity`, and add a matching line to the reduced-motion block.
