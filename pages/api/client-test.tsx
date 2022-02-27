import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await client.user.create({
        data: {
            email: "test2@test.com",
            name: "test2",
        },
    });
    res.json({
        ok: true,
    });
}
