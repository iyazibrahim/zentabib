import { isAdminAuthenticated } from './auth';
import { NextResponse } from 'next/server';

export async function requireAdmin() {
    const ok = await isAdminAuthenticated();
    if (!ok) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return null;
}
