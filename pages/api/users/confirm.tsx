import { withIronSessionApiRoute } from "iron-session/next";
import twilio from "twilio";
import mail from "@sendgrid/mail";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    const exists = await client.token.findUnique({
        where: {
            payload: token,
        },
    });
    if (!exists) res.status(404).end();
    req.session.user = {
        id: exists?.userId,
    };
    await req.session.save();
    res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
    cookieName: "carrotsession",
    password: "43452352346435632452123sadfsdf1234zsdfasf1235wasfds323",
});
