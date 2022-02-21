import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

client.user.create({
    data: {
        email: "test2@test.com",
        name: "test2",
    },
});
