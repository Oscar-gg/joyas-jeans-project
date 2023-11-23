import { PrismaClient } from "@prisma/client";

import { z } from "zod";
import { Roles } from "~/utils/role";

export const updateRole = async (
  email: string | null | undefined,
  prisma: PrismaClient,
): Promise<Roles> => {
  if (email) {
    const isAdmin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (isAdmin) return "admin";

    const isOrganizationMember = await prisma.organizationMember.findUnique({
      where: {
        email: email,
      },
    });

    if (isOrganizationMember) return "organizationMember";
  }

  return "authenticated";
};
