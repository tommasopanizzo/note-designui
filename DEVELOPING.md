# Developing & publishing

## Local dev

```bash
cd folder-designui
npm install
npm run dev
```

## Registry

After changing components under `components/` or `registry/default/`:

```bash
npm run registry:build
git add public/r registry.json registry/
git commit -m "chore: rebuild registry"
git push
```

Deploy the project on Vercel so `https://folder-designui.vercel.app/r/*.json` is live before users run `npx shadcn add @chumy/...`.

## Do not push

Ignored via `.gitignore` (same idea as [shutter-designui](https://github.com/tommasopanizzo/shutter-designui)):

- `node_modules/`, `.next/`, `out/`
- `.env*` (API keys, secrets)
- `.vercel/` (local project link)
- logs, editor folders (`.cursor/`, `.vscode/`), OS junk

**Do push** after `npm run registry:build`: `public/r/`, `registry.json`, `registry/default/`, source, `LICENSE`, `README.md`, lockfile.

## Checklist before publish

- [ ] `npm run build` passes
- [ ] `npm run registry:build` committed (`public/r/`)
- [ ] Vercel deploy from this folder
- [ ] `components.json` registry URL matches production
- [ ] `.github/FUNDING.yml` present (Sponsor button on GitHub)
- [ ] `LICENSE` committed (MIT)
