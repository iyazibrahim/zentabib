import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'zen_admin_session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getAuthSecret() {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error('AUTH_SECRET is not configured');
    }
    return secret;
}

function getAdminPassword() {
    const password = process.env.ADMIN_PASSWORD;
    if (!password) {
        throw new Error('ADMIN_PASSWORD is not configured');
    }
    return password;
}

function sign(value: string) {
    return createHmac('sha256', getAuthSecret()).update(value).digest('hex');
}

function buildToken(expiresAt: number) {
    const payload = `admin:${expiresAt}`;
    return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string) {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) {
        return false;
    }

    const expected = sign(payload);
    const provided = Buffer.from(signature);
    const expectedBuf = Buffer.from(expected);
    if (provided.length !== expectedBuf.length || !timingSafeEqual(provided, expectedBuf)) {
        return false;
    }

    const [, expiresRaw] = payload.split(':');
    const expiresAt = Number(expiresRaw);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
        return false;
    }

    return true;
}

export function validateAdminPassword(password: string) {
    const expected = getAdminPassword();
    const provided = Buffer.from(password);
    const expectedBuf = Buffer.from(expected);
    if (provided.length !== expectedBuf.length) {
        return false;
    }
    return timingSafeEqual(provided, expectedBuf);
}

export async function createAdminSession() {
    const expiresAt = Date.now() + SESSION_TTL_MS;
    const token = buildToken(expiresAt);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(expiresAt),
    });
}

export async function clearAdminSession() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME)?.value;
        if (!token) {
            return false;
        }
        return verifyToken(token);
    } catch {
        return false;
    }
}

export { COOKIE_NAME };
