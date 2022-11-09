// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextFetchEvent, userAgent } from "next/server";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { isBot } = userAgent(req);
    if (isBot) {
        return new Response("Plz don't be a bot. Be human.", { status: 403 });
    }
    if (!req.url.includes("/api")) {
        if (!req.url.includes("/enter") && !req.cookies.get("carrotsession")) {
            return NextResponse.redirect(new URL("/enter", req.url));
        }
    }
    //  return NextResponse.json({ ok: true });
}
