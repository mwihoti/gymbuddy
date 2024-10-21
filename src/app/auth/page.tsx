'use client'
import Image from "next/image";
import React, { use, useState } from "react";
import gym from "../../../assets/gym4.jpg";
import { useRouter } from 'next/navigation'

const Page: React.FC = () => {
  // State to toggle between login and sign-up forms
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('')
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/signin' : '/api/auth/signup';
    const body = isLogin ? { email, password} : { email, password, username};

    try {
      const response = await fetch(endpoint, {
        method: 'POSt',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Success:', data);
        router.push('/');
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Network error:', error );
    }
  }
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
        <form onSubmit={handleSubmit} className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Log In' : 'Sign Up'}</h2>
        {!isLogin && (
          <><input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-4 border rounded" />
          <br/>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border rounded" /></>
                   
        )}
        <input type='email' placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded" />

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          { isLogin ? 'Log In' : 'Sign Up'}
        </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
