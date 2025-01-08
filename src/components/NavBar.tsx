'use client'
import React, { useState} from 'react';
import Link from 'next/link';
import Image from "next/image";
import logo from '../../assets/logo.svg';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())

const NavBar: React.FC =  () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  const { data, error } = useSWR('/api/users', fetcher, {
    // Prevent revalidation on window focus
    shouldRetryOnError: false // Prevent retrying on error
  })
  console.log(data)

  const handleLogout = async () => {
    try {
     Cookies.remove('token');

localStorage.removeItem('token');
      // Clear SWR cache
      await mutate('/api/users', null, false);

      mutate(() => true, undefined, { revalidate: false});

      // Redirect to home page
      router.push('/');
      router.refresh();
      
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <nav className=" shadow">
      <div className=" max-w-full mx-auto  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  h-32 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src={logo} alt="Logo" width={120} />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-10">
            <Link href="/home" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500">Home</a>
            </Link>
            
            <Link href="/trainers" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500">Services</a>
            </Link>
            <Link href="/exercise" legacyBehavior>
            <a className='text-gray-700 hover:text-blue-500'>Exercises</a></Link>
            <>
            {!data?.user ? (
              <Link href="/auth">
                <button className="bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded">Join us</button>
              </Link>
            ) : (

              <>
              <Link href="/profile" className='flex gap-6'>
                <span className="text-gray-700 cursor-pointer hover:text-blue-500">Welcome, {data.user.username || data.user.email}</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Log Out</button>
              
              </Link>
              </>
            )}
            </>
          </div>
          <div className='hidden md:block'>
     
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden '>
             <div className="px-2 flex flex-col text-center pt-2 pb-3  gap-5 space-y-2 sm:px-3">
             <Link href="/home" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500">Home</a>
            </Link>
            
            <Link href="/trainers" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500">Services</a>
            </Link>
            <Link href="/exercise" legacyBehavior>
            <a className='text-gray-700 hover:text-blue-500'>Exercises</a></Link>
            {!data?.user ? (
              <Link href="/auth">
                <button className="bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded">Join us</button>
              </Link>
            ) : (
              <>
                <span className="text-gray-700">Welcome, {data.user.name || data.user.email}</span>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Log Out</button>
              </>
            )}
            </div>
          </div>

        )}
      </div>
    </nav>
  );
};

export default NavBar;
