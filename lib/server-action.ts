"use server";

import { prisma } from "./prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// Helper types
type BusinessType = "retail" | "service";
type Currency = "KES" | "USD" | "EUR" | "GBP" | "NGN" | "GHS" | "ZAR" | "INR" | "CAD" | "AUD" | "JPY" | "CNY";

// Helper functions (Mocked or Implemented)
async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function sendVerificationEmail(email: string, code: string) {
  console.log(`[MOCK] Sending verification email to ${email} with code: ${code}`);
  return { success: true, error: null };
}

async function sendVerificationMessage(phone: string, code: string, type: "sms") {
  console.log(`[MOCK] Sending verification SMS to ${phone} with code: ${code}`);
  return { success: true };
}

// Register
export async function registerBusiness(
  name: string,
  slug: string,
  ownerName: string,
  ownerEmail: string,
  phoneNumber: string,
  password: string,
  validatedCurrency: string,
  selectedBusinessType: BusinessType,
  currency: Currency = "KES"
) {
  try {
    if (!name || !slug || !ownerName || !ownerEmail || !password) {
      return { error: "All fields are required" };
    }

    const existingBusiness = await prisma.business.findUnique({
      where: { slug },
    });
    if (existingBusiness) return { error: "Business name is already taken" };

    const existingUser = await prisma.user.findUnique({
      where: { email: ownerEmail.toLowerCase().trim() },
    });
    if (existingUser) return { error: "Email already registered" };

    const businessType: BusinessType = selectedBusinessType === "retail" ? "retail" : "service";

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000);
    const userId = randomUUID();

    const business = await prisma.business.create({
      data: {
        name,
        slug,
        currency,
        validatedCurrency,
        businessType,
        ownerId: userId,
        users: {
          create: {
            id: userId,
            name: ownerName,
            email: ownerEmail.toLowerCase().trim(),
            phone: phoneNumber, // Mapped to 'phone' in schema
            password: await hashPassword(password), // Mapped to 'password' in schema
            role: "ADMIN", // Using uppercase enum if needed, or string if schema changed. Schema says Role enum: BUYER, SELLER, ADMIN
            isVerified: false,
            verificationCode,
            verificationCodeExpires: verificationExpires,
          },
        },
      },
    });

    const emailResult = await sendVerificationEmail(
      ownerEmail.toLowerCase().trim(),
      verificationCode
    );

    let warning = null;
    if (emailResult.error) {
      console.warn("Initial verification email failed:", emailResult.error);
      warning = "Account created, but verification email failed to send. Please try checking your email or use the resent option.";
    }

    if (phoneNumber) {
      await sendVerificationMessage(phoneNumber, verificationCode, "sms");
    }

    const user = await prisma.user.findFirst({
      where: { businessId: business.id, role: "ADMIN" },
    });

    if (user) {
      const cookieStore = await cookies();
      const secure = process.env.NODE_ENV === "production";

      cookieStore.set("session_user_id", user.id, {
        httpOnly: true,
        secure,
        maxAge: 604800,
        sameSite: "lax",
        path: "/",
      });
      // businessId might be on user or fetched via relation. Schema has businessId on User.
      cookieStore.set("session_business_id", user.businessId!, {
        httpOnly: true,
        secure,
        maxAge: 604800,
        sameSite: "lax",
        path: "/",
      });
      cookieStore.set("session_role", user.role, {
        httpOnly: true,
        secure,
        maxAge: 604800,
        sameSite: "lax",
        path: "/",
      });
    }

    return {
      success: true,
      businessSlug: business.slug,
      requiresVerification: true,
      email: ownerEmail,
      warning,
    };
  } catch (error: any) {
    console.error("Registration error:", error);

    if (error.code === "P2002") return { error: "Business name or email already exists" };
    if (error.code === "P1001") return { error: "Database unavailable. Please try again later." };

    return { error: "Failed to register business. Please try again." };
  }
}

// Login

export async function loginBusiness(email: string, password: string) {
  try {
    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { business: true },
    });

    if (!user || !user.password) {
      return { error: "Invalid email or password" };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { error: "Invalid email or password" };
    }

    if (!user.businessId) {
      return { error: "No business associated with this account" };
    }

    // Set sessions
    const cookieStore = await cookies();
    const secure = process.env.NODE_ENV === "production";
    const maxAge = 60 * 60 * 24 * 7; // 7 days

    cookieStore.set("session_user_id", user.id, {
      httpOnly: true,
      secure,
      maxAge,
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("session_business_id", user.businessId, {
      httpOnly: true,
      secure,
      maxAge,
      sameSite: "lax",
      path: "/",
    });
    
    cookieStore.set("session_role", user.role, {
        httpOnly: true,
        secure,
        maxAge,
        sameSite: "lax",
        path: "/",
    });

    const businessSlug = user.business?.slug || "";
    const businessType = user.business?.businessType || "retail";

    return {
      success: true,
      businessSlug,
      businessType,
    };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Failed to login. Please try again." };
  }
}
