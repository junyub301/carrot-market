import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";
import { count } from "console";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        body: { productId, sellerId },
        session: { user },
        method,
    } = req;

    if (method === "GET") {
        const chatRooms = await client.chatroom.findMany({
            where: {
                NOT: [
                    {
                        buyer: null,
                    },
                    {
                        productId: null,
                    },
                ],
            },
            include: {
                buyer: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                messages: {
                    take: 1,
                    orderBy: {
                        updatedAt: "asc",
                    },
                },
            },
        });
        res.json({ ok: true, chatRooms });
    } else {
        const alreadyExists = await client.chatroom.findFirst({
            where: {
                productId,
                buyerId: user?.id,
            },
            select: {
                id: true,
            },
        });

        if (alreadyExists) {
            res.json({ ok: true, chatRoom: alreadyExists });
        } else {
            const chatRoom = await client.chatroom.create({
                data: {
                    product: {
                        connect: {
                            id: productId,
                        },
                    },
                    buyer: {
                        connect: {
                            id: user?.id,
                        },
                    },
                    seller: {
                        connect: {
                            id: sellerId,
                        },
                    },
                },
            });
            res.json({ ok: true, chatRoom });
        }
    }
}

export default withApiSession(
    withHandler({ methods: ["GET", "POST"], handler })
);
