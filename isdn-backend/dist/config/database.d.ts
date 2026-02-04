import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";
declare const prisma: PrismaClient<{
    adapter: PrismaMariaDb;
}, never, import("@prisma/client/runtime/client").DefaultArgs>;
export default prisma;
