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
        session: { user },
    } = req;
    const stream = await client.stream.findUnique({
        where: {
            id: +id!.toString(),
        },
        include: {
            chatroom: {
                where: {
                    streamId: +id!.toString(),
                },
                include: {
                    messages: {
                        select: {
                            id: true,
                            message: true,
                            user: {
                                select: {
                                    avatar: true,
                                    id: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    const isOwner = stream?.userId === user?.id;
    if (stream && !isOwner) {
        stream.cloudflareKey = "";
        stream.cloudflareUrl = "";
    }
    res.json({ ok: true, stream });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
