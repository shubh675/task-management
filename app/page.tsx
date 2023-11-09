import { getServerAuthSession } from "@/next-auth/auth";
import Board from "@ui/Board";
//import { api } from "@trpc/client-side/server";
import Header from "@ui/Header";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Header session={session} />

      <main className="flex min-h-screen flex-col  bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {session ? <Board /> : <div> singup to seee or add tasks</div>}
      </main>
    </>
  );
}
