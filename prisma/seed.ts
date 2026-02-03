import { prisma } from '../lib/prisma';

async function main() {
  console.log('No default data seeded. Production-ready.');
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
