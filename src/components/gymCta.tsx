'use client'
import React, { useState } from 'react';
import { CheckCircle, Dumbbell, Users, Calendar, ArrowRight, Zap, Star } from 'lucide-react';

const GymCTASection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-500 via-purple-900 to-gray-900 rounded-3xl overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
            <Zap className="w-4 h-4" />
            Where all gets better
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-blue-200 mb-6 leading-tight">
            MuscleMind
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Gym
            </span>
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-2xl font-bold text-white mb-4">
              Tired of wishing for the perfect body?
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Struggling with stress, loneliness, or staying motivated on your fitness journey?
            </p>
            <p className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
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
          </div>
        </div>

        {/* Main CTA Card */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Pricing & Features */}
            <div className="space-y-8">
              {/* Pricing Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur-xl opacity-25 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Open to Anyone</h3>
                    <div className="">
                    <div className='flex flex-col gap-5'>

                     <div className='bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full'>
                      <span className="text-2xl font-black">KSH 100</span>
                      <span className="text-sm font-bold opacity-90 ml-2">/ Day</span>
                      </div>
                       <div className='bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full'>
                      <span className="text-2xl font-black">KSH 2500</span>
                      <span className="text-sm font-italicopacity-90 ml-2">/ Monthly</span>
                      </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>No Commitment</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>All Equipment</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Group Classes</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span>Community Access</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Trainers Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-black/40 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Personal Trainers Available</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span>Boxing, Taekwondo and Yoga Training available</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-200">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                      <span>Let's Work on your body</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                    <span className="text-gray-300 ml-2">Expert Trainers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Call to Action */}
            <div className="text-center lg:text-left">
              <div className="relative">
                {/* Floating Elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-bounce opacity-20"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce delay-700 opacity-20"></div>
                
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 hover:from-white/10 hover:to-white/15 transition-all duration-700 transform hover:scale-105">
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-full animate-pulse">
                      <Dumbbell className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-black text-white mb-6">
                    Ready to Start Your
                    <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Journey Today?
                    </span>
                  </h2>
                  
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Train smarter with cutting-edge machines, personalized workout programs and supportive community. 
                    Burn fat, build muscle, boost confidence — it's all possible here.
                  </p>

                  {/* CTA Button */}
                  <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-size-200 hover:bg-pos-100 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      👉 Start Your Journey Now
                      <ArrowRight className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  {/* Additional Info */}
                  <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-400" />
                      <span>No Long-term Contract</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Start Immediately</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
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
              <div className='w-10 h-10'>
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
  );
};

export default GymCTASection;