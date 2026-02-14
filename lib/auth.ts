import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./send-mail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  // auth logic
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 50,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail(user.email, url, "Reset Password");
    },
    resetPasswordTokenExpiresIn: 10 * 60, // 10 minutes
  },

  // custom user logic
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
        input: false, // don't allow user to set role
      },
      batch: {
        type: "string",
        required: true,
        input: true,
      },
      section: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  secret: process.env.BETTER_AUTH_SECRET!,
  plugins: [nextCookies()], // make sure
});
