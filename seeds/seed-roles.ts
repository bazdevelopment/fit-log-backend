import { ROLE_NAME } from "@prisma/client";
import prisma from "../src/config/prisma";
import { generateUniqueId } from "../src/utils/generateUniqueId";
/**
 * helper function used to populate roles db table with data
 */

const roles = [
  { id: generateUniqueId(), name: "USER" },
  { id: generateUniqueId(), name: "ADMIN" },
];

/** populate the roles table */
const seedRoles = async () => {
  for (const role of roles) {
    await prisma.role.create({
      data: { id: role.id, name: role.name as ROLE_NAME },
    });
  }
};

seedRoles()
  .catch((error) => {
    throw error;
  })
  .finally(() => prisma.$disconnect);
