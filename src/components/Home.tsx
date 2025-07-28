import React from "react";
import Image from "next/image";
import gym1 from "../../assets/gym5.jpg";
import Link from 'next/link';
import WorkoutPlanner from "@/components/workout-planner";

const HomePage: React.FC = () => {
  return (
<div>
<header className="text-center py-8">
        <h1 className="text-emerald-700 text-4xl font-extrabold">MuscleMind Gym</h1>
        <h3 className="text-lg text-gray-600">Where all gets better.</h3>
        <div>
          <p>
            <b>Tired of wishing for the perfect body?</b><br></br>
            Struggling with stress, loneliness, or staying motivated on your fitness journey? <br></br>
            <b>At MuscleMind Fitness gym, we got you covered - physically and mentally.</b>
            <br/>
            We don't just train your muscles - We train your mind too.
        <b>    🔥 It's more than a workout. It's a mindset.</b><br></br>

Join <b>MuscleMind </b> today and become your strongest self — inside and out.
<br></br>
<button className="p-3"><b>👉 [Start Your Journey Now]</b> </button> 
          </p>
        </div>
      </header>
    <div className=" flex items-center justify-between bg-gray-100">
      {/* Heading */}
     

      {/* Main Content: Image and Text Section */}
      <div className="flex flex-col md:flex-row w-full py-4 gap-4  right-5 md:gap-0">
        {/* Image Section */}
        <div className="relative w-full md:w-1/2 flex justify-center">
          <Image
            className="object-cover rounded-lg shadow-lg"
            src={gym1}
            height={500}
            width={700}
            alt="Gym"
          />

          {/* Membership Ad and Join Us Button (Overlay) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Become a Member Today!</h2>
            <p className="mb-6 text-center">Join now and get 50% off your first month.</p>
            <Link href="/auth "><button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full transition duration-300">
              Join Us
            </button>
            </Link>
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            Our mission is to provide a fitness experience that is welcoming,
            inclusive, and empowering to all. We are committed to helping you
            achieve your fitness goals, no matter your age, fitness level, or
            experience. We believe that everyone deserves to feel strong,
            confident, and healthy, and we are here to help you get there.
          </p>

          {/* Right Side - Book a Session with Trainer */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Book a Session</h2>
            <p className="mb-4">Schedule a personal training session to reach your fitness goals.</p>
            <Link href="/classes">
            <button className="mt-2 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-300">
              Book a Trainer
            </button>
            </Link>
          </div>

         
        </div>
        
      </div>
     
      
    </div>
    </div>
  );
};

export default HomePage;
