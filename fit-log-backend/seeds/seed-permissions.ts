import prisma from "../src/config/prisma";
import { PERMISSIONS_NAME } from "../src/enums/permissions-name";
import { generateUniqueId } from "../src/utils/generateUniqueId";

/**
 * helper function used to populate permissions db table with data
 */

const transformedUserPermissions = Object.keys(PERMISSIONS_NAME).map(
  (name) => name
);

const seedPermissions = async () => {
  for (const userPermission of transformedUserPermissions) {
    await prisma.permission.create({
      data: {
        id: generateUniqueId(),
        name: userPermission,
      },
    });
  }
};

seedPermissions()
  .catch((error) => {
    throw error;
  })
  .finally(() => prisma.$disconnect);
