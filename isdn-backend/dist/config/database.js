"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
require("dotenv/config");
const connectionString = process.env.DATABASE_URL || "";
const adapter = new adapter_mariadb_1.PrismaMariaDb(connectionString);
const prisma = new client_1.PrismaClient({ adapter });
exports.default = prisma;
//# sourceMappingURL=database.js.map