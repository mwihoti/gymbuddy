import React from "react";
import HomePage from '../../components/Home';
import ClassesT from '@/components/classesTt';

import WorkoutPlanner from "@/components/workout-planner";
import GymCtaSection from "@/components/gymCta";

const HomePages: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 pb-8">
          <GymCtaSection />
        <HomePage />
        <WorkoutPlanner />
        <ClassesT />
        
      </div>
    );
}
export default HomePages;