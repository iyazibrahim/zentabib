<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description"
        content="Zen AI - Bridging Traditional Wisdom with Modern Technology. Medical Devices, ZenLive, AI Diagnosis, Herbal Medicine, and TCM Training.">

    <!-- Open Graph / Facebook / WhatsApp -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ config('app.url') }}">
    <meta property="og:title" content="Zen AI - Modern TCM Solutions">
    <meta property="og:description"
        content="Zen AI - Bridging Traditional Wisdom with Modern Technology. Medical Devices, ZenLive, AI Diagnosis, Herbal Medicine, and TCM Training.">
    <meta property="og:image" content="{{ asset('zen-ai-logo.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ config('app.url') }}">
    <meta property="twitter:title" content="Zen AI - Modern TCM Solutions">
    <meta property="twitter:description"
        content="Zen AI - Bridging Traditional Wisdom with Modern Technology. Medical Devices, ZenLive, AI Diagnosis, Herbal Medicine, and TCM Training.">
    <meta property="twitter:image" content="{{ asset('zen-ai-logo.png') }}">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Zen AI') }}</title>

    <link rel="icon" href="/zen-ai-logo.png" type="image/png">
    <link rel="apple-touch-icon" href="/zen-ai-logo.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>