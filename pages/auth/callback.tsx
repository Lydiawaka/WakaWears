import { GetServerSideProps } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { prisma } from '@/lib/prisma';

export default function AuthCallback() {
  return null; // This page should mock redirect
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const userId = session?.user?.id;

  if (!userId) {
    return {
      redirect: {
        destination: '/seller/login',
        permanent: false,
      },
    };
  }

  // Find the user's shop
  const shop = await prisma.shop.findFirst({
    where: { ownerId: userId },
    select: { slug: true }
  });

  if (shop && shop.slug) {
    return {
      redirect: {
        destination: `/${shop.slug}/dashboard`,
        permanent: false,
      },
    };
  }

  // If no shop found, maybe redirect to onboarding or setup
  return {
    redirect: {
      destination: '/seller/onboarding', // Adjust as needed
      permanent: false,
    },
  };
};
