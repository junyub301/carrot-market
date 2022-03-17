import { PrismaClient } from "@prisma/client";

declare global {
    var client: PrismaClient | undefined;
}
// 쿼리 로그를 보고 싶으면 => new PrismaClient({log:["query"]});
const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
