// const chats = await client.
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

    const alreadyExists = await client.message.findFirst({
        where: {
            userId: +id.toString(),
        },
    });
    if (alreadyExists) {
        const chat = await client.message.findFirst({
            where: {
                userId: +id.toString(),
            },
            select: {
                id: true,
            },
        });
    } else {
        /*   const message = await client.message.create({
            data: {
                message: body.message,
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
            },
        }); */
    }
    res.json({ ok: true });
}

export default withApiSession(
    withHandler({ methods: ["GET", "POST"], handler })
);
