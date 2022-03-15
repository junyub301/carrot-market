import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    return res.json({
        ok: true,
    });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
