import { getServerAuthSession } from "@/next-auth/auth";
import Header from "@ui/Header";
import SingleBoard from "@ui/SingleBoard";
import { getAllTaskListServerSide } from "@lib/getAllTaskListServerSIde";

export default async function Home() {
  const session = await getServerAuthSession();
  const AllTaskList = await getAllTaskListServerSide(session);

  return (
    <>
      <Header session={session} />

      <main className="flex min-h-screen flex-col  bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
         {session ? (
          AllTaskList ? (
            <SingleBoard board={AllTaskList} />
          ) : (
            <SingleBoard board={[]} />
          )
        ) : (
          <div> sign in to seee or add tasks</div>
        )} 
      </main>
    </>
  );
}
