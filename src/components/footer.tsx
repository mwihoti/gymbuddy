import Link from 'next/link';
import React from 'react'

const FooterPage: React.FC = () => {


    return (
        <footer className='bg-gray-800 text-white p-8'> 
        <div className='container mx-auto px-4'>
            <div className='flex flex-wrap justify-between'>
                <div className='w-full md:w-1/4 mb-6 md:mb-0'>
                <h3 className='text-lg font-semibold mb-2'>Fitness Gym</h3>
                <p className='text-sm'>Where all gets better.</p>
                </div>
                <div className='w-full md:w-1/4 mb-6 md:mb-0'>
                <h4 className='text-lg font-semibold mb-3'> Quick Links</h4>
                <ul className='text-sm'>
                    <li><Link href="/classes" className="hover:text-emerald-500 transition duration-300"> Classes </Link> </li>
                    <li><Link href="/services" className="hover:text-emerald-500 transition duration-300"> Services </Link> </li>

                </ul>

                </div>
                <div className='w-full md:w-1/4 mb-6 md:mb-0'>
                <h4 className='text-lg font-semibold mb-2'
                </div>
            </div>
        </div>
        </footer>

    )
}

export default FooterPage;