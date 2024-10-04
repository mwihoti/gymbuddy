'use client'
import Image from "next/image";
import React, { useState } from "react";
import gym from "../../../assets/gym4.jpg";

const Page: React.FC = () => {
  // State to toggle between login and sign-up forms
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      {/* Left Side: Image and Welcome Message */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-bold text-emerald-700 mb-6">Welcome to KitchenGym</h2>
        <div className="w-full flex justify-center">
          <Image className="rounded-lg shadow-lg" src={gym} alt="gym" width={800} height={400} />
        </div>
      </div>

      {/* Right Side: Login/Sign Up Toggle Section */}
      <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        {/* Toggle Buttons */}
        <div className="mb-6 flex space-x-6">
          <button
            className={`px-6 py-2 font-semibold rounded-lg transition ${
              isLogin ? "bg-emerald-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`px-6 py-2 font-semibold rounded-lg transition ${
              !isLogin ? "bg-emerald-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form Section */}
        {isLogin ? (
          <div className="w-full">
            <h3 className="text-xl font-bold text-center mb-4">Log In</h3>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                Log In
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full">
            <h3 className="text-xl font-bold text-center mb-4">Sign Up</h3>
            <form className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="password"
                placeholder="Password"
                className="px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                Sign Up
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
