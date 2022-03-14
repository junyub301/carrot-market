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

    /* record를 사용하고 싶을경우.. 나중에 변경
     const saless = client.record.findMany({
        where: {
            userId: user?.id,
            kind: "Sale",
        },
    });
    console.log(saless);
     */

    const sales = await client.sale.findMany({
        where: {
            userId: user?.id,
        },
        include: {
            product: {
                include: {
                    _count: {
                        select: {
                            favs: true,
                        },
                    },
                },
            },
        },
    });
    res.json({ ok: true, sales });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
