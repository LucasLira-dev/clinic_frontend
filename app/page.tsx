import { authClient } from "@/lib/auth-client";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardContent } from "@/components/DashboardComponents/DashboardContent";

export default async function Home() {

  let session = null;
  try {
    session = await authClient.getSession({
      fetchOptions: {
        headers: await headers()
      }
    });
  } catch (error) {
    console.error('Erro ao obter sessao:', error);
  }

  if (!session?.data) {
    redirect('/login');
  }

  const firstName = session.data.user.name.split(' ')[0];
  const userRole = session.data.user.role;

  return (
    <div>
      <div className="px-6 pt-2 pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <Separator />
      <DashboardContent name={firstName} userRole={userRole ?? ''} />
    </div>
  );
}
