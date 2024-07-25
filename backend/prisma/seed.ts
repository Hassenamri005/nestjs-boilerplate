import { PrismaClient } from '@prisma/client';
import { InitUserRoles } from './seeds/user-role.seed';
import { InitArticles } from './seeds/articles.seed';
import { InitUsers } from './seeds/user.seed';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create one dummy article
  await InitArticles(prisma);
  // INIT ROLES
  await InitUserRoles(prisma);
  //INIT Users
  await InitUsers(prisma);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
