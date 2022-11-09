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
        body,
        query: { id },
    } = req;

    const stream = await client.stream.findFirst({
        where: {
            id: +id!.toString(),
        },
        select: {
            id: true,
            userId: true,
        },
    });

    const alreadyExists = await client.chatroom.findFirst({
        where: {
            sellerId: stream?.userId,
            streamId: +id!.toString(),
        },
        select: {
            id: true,
        },
    });

    const message = await client.message.create({
        data: {
            message: body.message,
            chatroom: {
                connect: {
                    id: alreadyExists?.id,
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

export default withApiSession(withHandler({ methods: ["POST"], handler }));
