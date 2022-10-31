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
        body: { answer },
    } = req;

    const post = await client.post.findUnique({
        where: {
            id: +id.toString(),
        },
        select: {
            id: true,
        },
    });

    if (!post) return res.status(404).json({ ok: false });

    if (req.method === "POST") {
        const newAnswer = await client.answer.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                post: {
                    connect: {
                        id: +id.toString(),
                    },
                },
                answer,
            },
        });

        res.json({ ok: true, answer: newAnswer });
    } else if (req.method === "DELETE") {
        const newAnswer = await client.answer.delete({
            where: {
                id: req.body.answerId,
            },
        });

        res.json({ ok: true, answer: newAnswer });
    }
}

export default withApiSession(
    withHandler({ methods: ["POST", "DELETE"], handler })
);
