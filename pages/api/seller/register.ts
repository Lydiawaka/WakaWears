import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { businessName, ownerName, email, phone, password, categories } = req.body;

  if (!businessName || !ownerName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const slug = slugify(businessName);

    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // 2. Check if business slug is taken
    const existingBusiness = await prisma.business.findUnique({ where: { slug } });
    if (existingBusiness) {
      return res.status(409).json({ message: 'Business name is already taken. Please choose another.' });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create User, Business, and Shop in ONE transaction
    await prisma.$transaction(async (tx) => {
      // 4.1 Create User
      const user = await tx.user.create({
        data: {
          name: ownerName,
          email,
          password: hashedPassword,
          phone,
          role: 'SELLER',
        },
      });

      // 4.2 Create Business owned by this user
      const business = await tx.business.create({
        data: {
          name: businessName,
          slug,
          currency: 'KES',
          validatedCurrency: 'KES',
          businessType: 'retail',
          ownerId: user.id,
        },
      });

      // 4.3 Create Shop under this Business
      await tx.shop.create({
        data: {
          name: businessName,
          slug,
          description: categories ? `Seller of ${categories.join(', ')}` : undefined,
          isVerified: false,
          ownerId: user.id,
          businessId: business.id
        },
      });

      // 4.4 Update user with businessId
      await tx.user.update({
        where: { id: user.id },
        data: {
          businessId: business.id,
        },
      });
    });

    return res.status(201).json({
      message: 'Seller account created successfully',
      slug,
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      message: 'Internal server error while creating account',
    });
  }
}
