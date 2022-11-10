import { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (!req.url.includes("/api")) {
        if (!req.url.includes("/enter") && !req.cookies.get("carrotsession")) {
            return NextResponse.redirect(new URL("/enter", req.url));
        }
    }
    //  return NextResponse.json({ ok: true });
}

export const config = {
    matcher: "/",
};
