import { createAuthClient } from "better-auth/react";

const USER_ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

if (!process.env.NEXT_PUBLIC_BETTER_AUTH_URL) {
   throw new Error('NEXT_PUBLIC_BETTER_AUTH_URL environment variable is not defined.')
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  fetchOptions: {
    credentials: 'include',
  },
  user: {
    additionalFields: {
      role: {
        type: USER_ROLES,
        required: true,
        defaultValue: "patient",
        input: true,
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
})