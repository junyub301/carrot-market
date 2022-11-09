import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        query: { id },
        body,
        session: { user },
        method,
    } = req;

    if (method === "GET") {
        const messages = await client.message.findMany({
            where: {
                chatroomId: +id!.toString(),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        avatar: true,
                    },
                },
            },
        });
        res.json({ ok: true, messages });
    } else {
        const message = await client.message.create({
            data: {
                message: body.message,
                chatroom: {
                    connect: {
                        id: +id!.toString(),
                    },
                },
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
            },
        });
        res.json({ ok: true, message });
    }
}

export default withApiSession(
    withHandler({ methods: ["GET", "POST"], handler })
);
