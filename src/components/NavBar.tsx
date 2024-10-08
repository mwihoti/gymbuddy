'use client'
import React, { useState} from 'react';
import Link from 'next/link';
import Image from "next/image";
import logo from '../../assets/logo.svg'

const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
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
            <Link href="/about" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500">About</a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500">Services</a>
            </Link>
            <Link href="/contact" legacyBehavior>
              <a className="text-gray-700 hover:text-blue-500">Contact</a>
            </Link>
          </div>
          <div className='hidden md:block'>
            <Link href="/auth" >
            <button className='bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded'>Join us</button>
            </Link>
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
          <div className='md:hidden'>
             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/home" legacyBehavior>
                <a className="block text-gray-700 hover:text-blue-500 py-2">Home</a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a className="block text-gray-700 hover:text-blue-500 py-2">About</a>
              </Link>
              <Link href="/services" legacyBehavior>
                <a className="block text-gray-700 hover:text-blue-500 py-2">Services</a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="block text-gray-700 hover:text-blue-500 py-2">Contact</a>
              </Link>
              <button className='bg-gray-300 hover:bg-gray-500 py-2 px-4 rounded w-full text-left'>Join us</button>
            </div>
          </div>

        )}
      </div>
    </nav>
  );
};

export default NavBar;
