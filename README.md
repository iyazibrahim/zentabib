# Zen AI Healthcare

Advance healthcare solution provider bridging AI, portable diagnostics, and community-first wellness technology.

## Stack

- **Framework:** Next.js 15 (App Router, standalone Node server)
- **Frontend:** React 19, TypeScript, Tailwind CSS 4
- **Content:** File-based CMS (`data/site.json` + `public/uploads`)
- **Runtime:** Node.js 22

## Requirements

- Node.js 22+
- npm
- Docker (optional, recommended)

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:3025](http://localhost:3025).

Admin CMS: [http://localhost:3025/admin](http://localhost:3025/admin)

Set these in `.env`:

```env
ADMIN_PASSWORD=change-me
AUTH_SECRET=replace-with-a-long-random-string
NEXT_PUBLIC_SITE_URL=http://localhost:3025
```

## Docker

### Development

```bash
docker compose up
```

### Production

```bash
docker compose --profile prod up --build
```

The app listens on port `3025`. `data/` and `public/uploads/` are volume-mounted so CMS edits and photo uploads survive rebuilds.

## Production deploy

```bash
npm ci
npm run build
npm run start
```

This project uses the Next.js **standalone Node server** (not a static `out/` export), so admin saves and image uploads work at runtime.

Set environment variables:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ADMIN_PASSWORD=your-strong-password
AUTH_SECRET=your-long-random-secret
```

### Cloudflare Tunnel

Expose the local app securely without opening firewall ports:

```bash
cloudflared tunnel login
cloudflared tunnel create zentabib
cloudflared tunnel route dns zentabib your-domain.com
```

Example tunnel ingress:

```yaml
tunnel: zentabib
credentials-file: /path/to/<tunnel-uuid>.json

ingress:
  - hostname: your-domain.com
    service: http://127.0.0.1:3025
  - hostname: www.your-domain.com
    service: http://127.0.0.1:3025
  - service: http_status:404
```

Cloudflare dashboard:

- SSL/TLS: **Full** or **Full (strict)**
- Enable **Always Use HTTPS**

## Project structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages, layouts, and API routes |
| `components/` | Shared React components |
| `data/site.json` | Editable website content |
| `public/uploads/` | CMS-uploaded images |
| `lib/content/` | Content types and store helpers |
| `docker-compose.yml` | Docker dev and prod profiles |

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/services/[slug]` | Core service detail pages |
| `/admin` | Password-protected CMS |
| `/ai-diagnose-system` | Redirects to AI Health Screening |
| `/medical-devices` | Redirects to Cardiopulmonary Image Diagnostic |
| `/zenlive` | Redirects to Real-Time Health Monitoring |
| `/clinical-services` | Redirects to Real-Time Health Monitoring |

## Contact

- WhatsApp: [+601112332101](https://api.whatsapp.com/send/?phone=6001112332101&text&type=phone_number&app_absent=0)
- Email: rohaizan@zentabib.com

## License

Proprietary. All rights reserved.
