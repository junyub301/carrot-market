import { Post } from ".prisma/client";
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

    if (req.method === "GET") {
        const product = await client.product.findUnique({
            where: { id: +id.toString() },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                    },
                },
                chatrooms: {
                    select: {
                        id: true,
                        sellerId: true,
                        buyerId: true,
                    },
                },
            },
        });
        const terms = product?.name
            .split(" ")
            .map((word) => ({ name: { contains: word } }));
        const relatedProducts = await client.product.findMany({
            where: {
                OR: terms,
                AND: {
                    id: {
                        not: product?.id,
                    },
                },
            },
        });
        const isLiked = Boolean(
            await client.fav.findFirst({
                where: {
                    productId: product?.id,
                    userId: user?.id,
                },
                select: {
                    id: true,
                },
            })
        );
        res.json({ ok: true, product, isLiked, relatedProducts });
    } else if (req.method === "POST") {
        const product = await client.product.update({
            where: {
                id: +id,
            },
            data: {
                soldOut: true,
            },
        });
        res.json({ ok: true, product });
    }
}

export default withApiSession(
    withHandler({ methods: ["GET", "POST"], handler })
);
