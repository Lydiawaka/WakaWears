import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default function AuthCallback() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { prisma } = await import('@/lib/prisma');

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

  const shop = await prisma.shop.findFirst({
    where: { ownerId: userId },
    select: { slug: true },
  });

  if (shop?.slug) {
    return {
      redirect: {
        destination: `/${shop.slug}/dashboard`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/seller/onboarding',
      permanent: false,
    },
  };
};
