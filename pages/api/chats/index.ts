import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        session: { user },
    } = req;

    const chats = await client.message.findMany({
        where: {
            id: req.session.user?.id,
        },
    });

    res.json({ ok: true, chats });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
