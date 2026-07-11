# Zen AI

Modern healthcare web platform bridging Traditional Complementary Medicine (TCM) with AI technology.

## Stack

- **Backend:** Laravel 12, PHP 8.2+
- **Frontend:** React 19, Inertia.js, TypeScript, Tailwind CSS
- **Database:** SQLite (default)

## Requirements

- PHP 8.2+
- Composer
- Node.js 20+
- npm

## Local development

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
npm run dev
```

In another terminal:

```bash
php artisan serve
```

Set `APP_URL` in `.env` to your local URL (e.g. `http://zentabib.test`).

## Production deploy

```bash
composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
```

Update `.env`:

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
SESSION_SECURE_COOKIE=true
```

Build and optimize:

```bash
npm ci
npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Run the app behind a local web server (recommended) or:

```bash
php artisan serve --host=127.0.0.1 --port=8000
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
    service: http://127.0.0.1:8000
  - hostname: www.your-domain.com
    service: http://127.0.0.1:8000
  - service: http_status:404
```

Cloudflare dashboard:

- SSL/TLS: **Full** or **Full (strict)**
- Enable **Always Use HTTPS**

The app trusts reverse proxies for HTTPS behind Cloudflare.

## Project structure

| Path | Purpose |
|------|---------|
| `resources/js/pages/` | Inertia page components |
| `resources/js/components/` | Shared React components |
| `public/zen-ai-logo.png` | Brand logo |
| `routes/web.php` | Public routes |

## Contact

- WhatsApp: [+601112332101](https://api.whatsapp.com/send/?phone=6001112332101&text&type=phone_number&app_absent=0)
- Email: rohaizan@zentabib.com

## License

Proprietary. All rights reserved.
