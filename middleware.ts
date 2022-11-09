// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest, NextFetchEvent } from "next/server";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.ua?.isBot as typeof req.ua) {
        return new Response("Plz don't be a bot. Be human.", { status: 403 });
    }
    if (!req.url.includes("/api")) {
        if (!req.url.includes("/enter") && !req.cookies.carrotsession) {
            return NextResponse.redirect(new URL("/enter", req.url));
        }
    }
    //  return NextResponse.json({ ok: true });
}
