
import { PrismaClient } from '@prisma/client';
// Use local prisma instance if possible to match app behavior, but typically new Client is fine for debug
// We will try to import from lib/prisma to reuse connection or just instantiate new one
const prisma = new PrismaClient();
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'lydiawaka88@gmail.com';
  console.log(`Checking user with email: ${email}`);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log('RESULT: User NOT found.');
    // Check if there are any users?
    const count = await prisma.user.count();
    console.log(`Total users in DB: ${count}`);
    return;
  }

  console.log('RESULT: User FOUND.');
  console.log(`ID: ${user.id}`);
  console.log(`Email: ${user.email}`);
  console.log(`Has password field value: ${!!user.password}`);
  console.log(`Password hash length: ${user.password?.length}`);
  
  if (user.password) {
      console.log(`Password hash prefix: ${user.password.substring(0, 10)}`);
      
      // Test common passwords if helpful? No, that's insecure/guessing.
      // But we can check if it matches the string "=Lydia@254%" which is in the screenshot.
      // The screenshot shows: "=Lydia@254%"
      
      const inputPass = "=Lydia@254%";
      console.log(`Testing password from screenshot: "${inputPass}"`);
      const match = await bcrypt.compare(inputPass, user.password);
      console.log(`Does screenshot password match? ${match}`);
      
      // Also test without the leading = just in case user typo'd in the screenshot or field
      const inputPass2 = "Lydia@254%";
      const match2 = await bcrypt.compare(inputPass2, user.password);
      console.log(`Does "Lydia@254%" (no leading =) match? ${match2}`);
  } else {
      console.log('User has NO password set.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
