export const InitUsers = async (prismaClient: any) => {
  // Create Admin account
  await prismaClient.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: '$2b$10$bdS87oU/IB8un3x.hkJ4COISd2ixNNcb2bddl2rIjMNS2xJvpkHDu', // 123456789
      roleId: 2,
      verified: true,
    },
  });

  // Create Provider account
  await prismaClient.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: 'Foulen',
      lastName: 'Fouleni',
      email: 'provider@gmail.com',
      password: '$2b$10$bdS87oU/IB8un3x.hkJ4COISd2ixNNcb2bddl2rIjMNS2xJvpkHDu', // 123456789
      roleId: 3,
      verified: true,
    },
  });

  // Create other Verified account
  await prismaClient.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      firstName: 'Tr',
      lastName: 'Other',
      email: 'other@gmail.com',
      password: '$2b$10$bdS87oU/IB8un3x.hkJ4COISd2ixNNcb2bddl2rIjMNS2xJvpkHDu', // 123456789
      roleId: 4,
      verified: true,
    },
  });

  // Create other Not Verified account
  await prismaClient.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      firstName: 'Tr',
      lastName: 'Other 2',
      email: 'other2@gmail.com',
      password: '$2b$10$bdS87oU/IB8un3x.hkJ4COISd2ixNNcb2bddl2rIjMNS2xJvpkHDu', // 123456789
      roleId: 4,
      verified: false,
    },
  });
};
