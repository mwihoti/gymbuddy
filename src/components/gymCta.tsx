'use client'
import React, { useState } from 'react';
import { CheckCircle, Dumbbell, Users, Calendar, ArrowRight, Zap, Star } from 'lucide-react';

const GymCtaSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden'>
            {/*Animated Background element */}
            <div className='absolute inset-0'>
                <div className='absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
                <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500/100 rounded-full blur-3xl animate-pulse delay-1000'></div>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500 '></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className='absolute inset-0 bg-[linear-gradient(rgba(255, 255, 255, .02)_1px, transparent_1px), linear-gradient(90deg. rgba(255, 255, 255, .02)_1px)] bg-[size: 50px_50px]'></div>


        <div className='absolute inset-0 bg-[linear-gradient(rgba(255, 255, 255, .02)_1px), linear-gradient(90deg, rgba(255, 255, 255, .02)_1px, transparent_1px)] bg-[size: 50px_50px]'></div>
        <div className='relative z-10 container mx-auto px-6 py-20'>
            {/* Header Section */}
            <div className='text-center mb-16'>
                <div className='inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce'>
                    <Zap className='w-4 h-4' />
                    Limited Time Offer

                </div>
                <h1 className='text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight'>
                    Transform Your
                    <span className='block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                        Body & Mind
                    </span>
                </h1>
                <p className='text-xl text-gray-300 max-w-3xl mx-auto leading=relaxed'>
                    Train Smarter with cutting-edge machines, personalized workout programs and supportive community. Burn fat, build muscle,
                    boost confidence - it's all possible here.
                </p>
            </div>
        </div>
        </div>
    )
}

export default GymCtaSection;