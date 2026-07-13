# Zen AI

Modern healthcare web platform bridging Traditional Complementary Medicine (TCM) with AI technology.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Frontend:** React 19, TypeScript, Tailwind CSS 4
- **Runtime:** Node.js 22

## Requirements

- Node.js 22+
- npm
- Docker (optional, recommended)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Docker

### Development

```bash
docker compose up
```

### Production

```bash
docker compose --profile prod up --build
```

The app listens on port `3000`.

## Production deploy

```bash
npm ci
npm run build
npm run start
```

Set environment variables as needed:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
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
    service: http://127.0.0.1:3000
  - hostname: www.your-domain.com
    service: http://127.0.0.1:3000
  - service: http_status:404
```

Cloudflare dashboard:

- SSL/TLS: **Full** or **Full (strict)**
- Enable **Always Use HTTPS**

## Project structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages and layouts |
| `components/` | Shared React components |
| `public/zen-ai-logo.png` | Brand logo |
| `docker-compose.yml` | Docker dev and prod profiles |

## Routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/medical-devices` | Medical Devices |
| `/ai-diagnose-system` | AI Diagnose System |
| `/zenlive` | ZenLive |
| `/clinical-services` | Redirects to `/zenlive` |

## Contact

- WhatsApp: [+601112332101](https://api.whatsapp.com/send/?phone=6001112332101&text&type=phone_number&app_absent=0)
- Email: rohaizan@zentabib.com

## License

Proprietary. All rights reserved.
