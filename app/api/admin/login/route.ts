import { createAdminSession, validateAdminPassword } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as { password?: string };
        const password = body.password ?? '';

        if (!validateAdminPassword(password)) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        await createAdminSession();
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
