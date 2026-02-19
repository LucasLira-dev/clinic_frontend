import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/client/components/navigation";
import { headers } from "next/dist/server/request/headers";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers()
    }
  });

  if (session && session.data?.user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
