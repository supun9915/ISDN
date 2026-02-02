import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL || "";
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // Create default roles
  const roles = [
    {
      roleName: "Super Admin",
      permissions: "Initial user with all permissions",
      active: true,
    },
    {
      roleName: "Admin",
      permissions: "Administer user with all permissions except super admin",
      active: true,
    },
    {
      roleName: "Business Customer",
      permissions:
        "Place orders, view orders, view invoices, view products, manage profile",
      active: true,
    },
    {
      roleName: "Retail Customer",
      permissions:
        "Place orders, view orders, view invoices, view products, manage profile",
      active: true,
    },
    {
      roleName: "Driver",
      permissions:
        "View deliveries, update delivery status, view orders, manage profile",
      active: true,
    },
  ];

  console.log("Creating roles...");
  for (const roleData of roles) {
    const role = await prisma.role.upsert({
      where: { id: roles.indexOf(roleData) + 1 },
      update: {},
      create: roleData,
    });
    console.log(`Created role: ${role.roleName}`);
  }

  // Get Super Admin role
  const superAdminRole = await prisma.role.findFirst({
    where: { roleName: "Super Admin" },
  });

  if (!superAdminRole) {
    throw new Error("Super Admin role not found!");
  }

  // Hash password for super admin
  const hashedPassword = await bcrypt.hash("superadmin", 10);

  // Create Super Admin user
  console.log("Creating Super Admin user...");
  const superAdminUser = await prisma.user.upsert({
    where: { email: "superadmin@gmail.com" },
    update: {},
    create: {
      username: "superadmin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      roleId: superAdminRole.id,
      name: "Super Administrator",
      contactNumber: "+94771234567",
      active: true,
    },
  });

  console.log(`Created Super Admin user: ${superAdminUser.username}`);
  console.log(`Email: ${superAdminUser.email}`);
  console.log(`Default Password: superadmin`);

  console.log("\nDatabase seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
