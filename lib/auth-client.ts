import { createAuthClient } from "better-auth/react";
import {
  customSessionClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { auth } from "./auth";

export const { signIn, signOut, signUp, useSession,requestPasswordReset,resetPassword,listAccounts } = createAuthClient({
  plugins: [
    customSessionClient<typeof auth>(),
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
        section: {
          type: "string",
        },
        batch: {
          type: "string",
        },
      },
    }),
  ],
  baseURL: process.env.BETTER_AUTH_URL!,
});
