import Link from 'next/link';
import type { Session } from 'next-auth';

interface HeaderProps {
  session: Session | null; 
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <header className="bg-blue-900 p-4 fixed top-0 max-w-full w-full">
      <div className="flex flex-col md:flex-row items-center justify-between container mx-auto">
        <Link href="/" className="text-white text-2xl font-bold mb-4 md:mb-0 md:mr-4">
          Task Management
        </Link>

        {session ? (
          <div className="text-white">
             {session.user?.name} {/* Replace 'name' with the actual property holding the user's name */}
            <Link href="/api/auth/signout" className="bg-red-500 text-white px-4 py-2 rounded-full ml-4">
              Sign Out
            </Link>
          </div>
        ) : (
          <Link href="/api/auth/signin" className="text-white">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
