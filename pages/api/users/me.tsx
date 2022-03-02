import { withIronSessionApiRoute } from "iron-session/next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    console.log(req.session.user);
    const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
    });
    res.json({ ok: true, profile });
    // res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
    cookieName: "carrotsession",
    password: "43452352346435632452123sadfsdf1234zsdfasf1235wasfds323",
});
