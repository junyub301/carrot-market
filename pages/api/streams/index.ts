import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        session: { user },
        body: { name, price, description },
    } = req;
    if (req.method === "POST") {
        const {
            result: {
                uid,
                rtmps: { streamKey, url },
            },
        } =
            {
                result: {
                    uid: "f256e6ea9341d51eea64c9454659e576",
                    rtmps: {
                        url: "rtmps://live.cloudflare.com:443/live/",
                        streamKey:
                            "MTQ0MTcjM3MjI1NDE3ODIyNTI1MjYyMjE4NTI2ODI1NDcxMzUyMzcf256e6ea9351d51eea64c9454659e576",
                    },
                },
            } ||
            // api 결제를 하지 않았기 떄문에 샘플 데이터 등록
            (await (
                await fetch(
                    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${process.env.CLOUDFLARE_STREAM_TOKEN}`,
                        },
                        body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
                    }
                )
            ).json());
        const stream = await client.stream.create({
            data: {
                cloudflareId: uid,
                cloudflareKey: streamKey,
                cloudflareUrl:
                    url ||
                    "MTQ0MTcjM3MjI1NDE3ODIyNTI1MjYyMjE4NTI2ODI1NDcxMzUyMzcf256e6ea9351d51eea64c9454659e576",
                name,
                price,
                description,
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
            },
        });
        res.json({ ok: true, stream });
    }
    if (req.method === "GET") {
        const streams = await client.stream.findMany({
            take: 10,
            skip: 20,
        });
        res.json({
            ok: true,
            streams,
        });
    }
}

export default withApiSession(
    withHandler({ methods: ["GET", "POST"], handler })
);
