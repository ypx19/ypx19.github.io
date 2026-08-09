# ypx19.github.io

Personal homepage for [GitHub Pages](https://pages.github.com/) — site URL will be **https://ypx19.github.io**.

## How to add your materials

Drop your content into the folders below (Markdown, PDF, images, or plain text all work):

| Folder | What to put here |
|--------|------------------|
| `content/resume/` | Resume / CV (PDF or Markdown preferred) |
| `content/projects/` | Project write-ups, links, screenshots, demos |
| `content/about/` | Bio, education, interests, contact preferences |
| `content/assets/` | Headshot, logos, project images |

Once those are in place and you’ve picked a visual style, the homepage will be built from this material.

## Design direction (chosen)

**Lab Notebook × Quiet Professional**

- **Look:** old handwritten lab notebook — paper texture, ink hierarchy, ruled/experiment-log details, warm academic tone
- **Structure:** recruiting-friendly multi-section layout like Quiet Professional:
  - About (bio, education, interests)
  - Experience
  - Projects
  - Skills / Contact
- Visual language stays notebook; section count and clarity match a resume site

## Local preview

```bash
cd ~/ws/ypx19.github.io
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy (GitHub Pages)

1. Create a public repo named `ypx19.github.io` under your GitHub account
2. Push `main`
3. Settings → Pages → Deploy from branch `main` / root

Site URL: https://ypx19.github.io

## Status

- [x] Repo scaffolded
- [x] Style chosen (Lab Notebook look + Quiet Professional sections)
- [x] Resume & project content added
- [x] Homepage built
- [ ] GitHub Pages enabled (push + turn on Pages)
