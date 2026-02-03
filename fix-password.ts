
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'lydiawaka88@gmail.com';
  const newPasswordPlain = '=Lydia@254%';

  console.log(`Searching for user: ${email}...`);
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    console.error('User not found! Aborting.');
    return;
  }

  console.log('User found. Hashing new password...');
  const hashedPassword = await bcrypt.hash(newPasswordPlain, 10);

  console.log('Updating user record...');
  await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  });

  console.log('Success! Password updated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
