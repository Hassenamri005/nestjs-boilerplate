export const InitUserRoles = async (prismaClient: any) => {
  await prismaClient.user_role.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, roleName: 'SUPERADMIN' },
  });
  await prismaClient.user_role.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, roleName: 'ADMIN' },
  });
  await prismaClient.user_role.upsert({
    where: { id: 3 },
    update: {},
    create: { id: 3, roleName: 'USER' },
  });
  await prismaClient.user_role.upsert({
    where: { id: 4 },
    update: {},
    create: { id: 4, roleName: 'Other' },
  });
};
