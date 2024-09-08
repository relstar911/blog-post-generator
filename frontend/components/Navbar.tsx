import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <span className="text-xl font-bold">Blog Post Generator</span>
          </Link>
          <div>
            {session && session.user ? (
              <>
                <Link href="/dashboard" className="mr-4">
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="text-red-600">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/api/auth/signin" className="mr-4">
                  Sign In
                </Link>
                <Link href="/auth/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
