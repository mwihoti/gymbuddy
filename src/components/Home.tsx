'use client'
import React, { useState } from "react";
import Image from "next/image";
import gym1 from "../../assets/gym5.jpg";
import Link from 'next/link';
import WorkoutPlanner from "@/components/workout-planner";

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-lg from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 flex flex-col">
        
        {/* Enhanced Header Section */}
        <header className="text-center py-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
              ✨ Where all gets better
            </div>

            {/* Main Title */}
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-purple-200 mb-4 leading-tight">
              MuscleMind
              <span className="block bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Gym
              </span>
            </h1>

            {/* Enhanced Content */}
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-2xl font-bold text-white">
                Tired of wishing for the perfect body?
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Struggling with stress, loneliness, or staying motivated on your fitness journey?
              </p>
              <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-purple-300">
                At MuscleMind Fitness gym, we got you covered - physically and mentally.
              </p>
              <p className="text-lg text-gray-200">
                We don't just train your muscles - We train your mind too.
              </p>
              <div className="flex items-center justify-center gap-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                🔥 It's more than a workout. It's a mindset.
              </div>
              <p className="text-lg text-gray-300">
                Join <span className="font-bold text-white">MuscleMind</span> today and become your strongest self — inside and out.
              </p>
              
              {/* Enhanced CTA Button */}
              <button 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative bg-gradient-to-r from-emerald-600 via-purple-600 to-emerald-600 bg-size-200 hover:bg-pos-100 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  👉 Start Your Journey Now
                  <svg className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </header>

        {/* Enhanced Main Content Section */}
        <div className="flex items-center justify-between px-6 pb-12">
          <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto gap-8 md:gap-12">
            
            {/* Enhanced Image Section */}
            <div className="relative w-full md:w-1/2 flex justify-center">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                <div className="relative">
                  <Image
                    className="object-cover rounded-3xl shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    src={gym1}
                    height={600}
                    width={900}
                    alt="MuscleMind Gym Interior"
                  />

                  {/* Floating Price Badge */}
                  <div className="flex flex-col gap-4">
                  <div className="absolute mb-10 top-6 right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full animate-bounce">
                    <span className="font-bold text-lg">KSH 100/Day</span>
                  </div>
                    <div className="absolute mt-20 top-6 right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full animate-bounce">
                    <span className="font-bold text-lg">KSH 2500/Monthly</span>
                  </div>
                  </div>

                  {/* Enhanced Membership Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-3xl flex items-end">
                    <div className="p-8 w-full">
                      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 text-white transform transition-all duration-500 hover:bg-white/15 hover:scale-105">
                        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-300 to-purple-300 bg-clip-text text-transparent">
                          Become a Member Today!
                        </h2>
                        <p className="mb-6 text-gray-200 text-lg">
                          Join now and get 50% off your first month.
                        </p>
                        <Link href="/auth">
                          <button className="bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                            Join Us Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Text Section */}
            <div className="w-full md:w-1/2 flex flex-col justify-center space-y-8">
              
              {/* Mission Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-gradient-to-r from-emerald-500 to-purple-500 p-3 rounded-xl">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                  </div>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Our mission is to provide a fitness experience that is welcoming, inclusive, and empowering to all. 
                    We are committed to helping you achieve your fitness goals, no matter your age, fitness level, or experience. 
                    We believe that everyone deserves to feel strong, confident, and healthy, and we are here to help you get there.
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      "Cutting-edge machines",
                      "Personalized programs", 
                      "Supportive community",
                      "Expert guidance"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-200">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: `${index * 200}ms`}}></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Book Session Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:bg-black/40 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Book a Session</h2>
                  </div>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Schedule a personal training session to reach your fitness goals with our expert trainers.
                  </p>
                  
                  {/* Training Options */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-sm">Boxing, Taekwondo and Yoga Training available</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-100"></div>
                      <span className="text-sm">Personalized workout plans</span>
                    </div>
                  </div>
                  
                  <Link href="/classes">
                    <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                      Book a Trainer
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-6 pb-12">
         <div className="mt-20 grid grid-cols-3 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: "200+",  icons: "👥" ,label: "Active Members" },
            { number: "8+", icons: "🥋", label: "Expert Trainers" },
            { number: "100+", icons: "🏋️",  label: "Equipment" },
            { number: "24/7", icons: "⏰", label: "Access" }
          ].map((stat, index) => (
            <div key={index} className="text-center flex flex-col justify-center items-center gap-3">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                {stat.number}
              </div>
              <div className=' text-4xl '>
                {stat.icons}
                </div>
              <div className="text-cyan-200  text-l font-bold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;