import React from "react";
import HomePage from '../../components/Home';

import WorkoutPlanner from "@/components/workout-planner";

const HomePages: React.FC = () => {
    return (
        <div className="flex flex-col gap-8 pb-8">
        <HomePage />
        <WorkoutPlanner />
      </div>
    );
}
export default HomePages;