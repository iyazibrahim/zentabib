<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/medical-devices', function () {
    return Inertia::render('medical-devices');
})->name('medical-devices');

Route::get('/ai-diagnose-system', function () {
    return Inertia::render('ai-diagnose-system');
})->name('ai-diagnose-system');

Route::get('/zenlive', function () {
    return Inertia::render('zenlive');
})->name('zenlive');

Route::redirect('/clinical-services', '/zenlive', 301);

// Redirect auth routes to home
Route::get('login', function () {
    return redirect()->route('home');
})->name('login');

Route::get('register', function () {
    return redirect()->route('home');
})->name('register');

Route::get('dashboard', function () {
    return redirect()->route('home');
})->name('dashboard');

// Catch-all for other auth routes if needed, or just leave them be as they are less discoverable
// For now, explicit redirects are safer for the requested "static page" feel.

require __DIR__ . '/settings.php';
