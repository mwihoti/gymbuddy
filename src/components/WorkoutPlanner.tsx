'use client'
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const WorkoutPlanner = () => {
    const [fitnessLevel, setFitnessLevel] = useState('');
    const [targetMuscle, setTargetMuscle] = useState('');
    interface Exercise {
      name: string;
      type: string;
      muscle: string;
      difficulty: string;
      instructions: string;
    }
    
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    interface WorkoutPlan {
      id: string;
      name: string;
      createdAt: string;
      exercises: Exercise[];
    }
    
    const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
    const [planName, setPlanName] = useState('');
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        fetchWorkoutPlans(token);
      }
    }, []);
  
    const fetchExercises = async (muscle: String) => {
      const response = await fetch(`/api/exercises?muscle=${muscle}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch exercises');
      }
      return response.json();
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if ( !targetMuscle) {
        setError('Please select both fitness level and target muscle.');
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        const fetchedExercises = await fetchExercises(targetMuscle);
        setExercises(fetchedExercises);
        if (fetchedExercises.length === 0) {
          setError('No exercises found for the selected criteria. Try different options.');
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
        if (error instanceof Error) {
          setError(error.message || 'Failed to fetch exercises. Please try again.');
        } else {
          setError('Failed to fetch exercises. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    const saveWorkoutPlan = async () => {
      if (!planName) {
        setError('Please enter a name for your workout plan.');
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to save a workout plan.');
        return;
      }
      try {
        const response = await fetch('/api/workout-plans', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ name: planName, exercises }),
        });
        if (!response.ok) {
          throw new Error('Failed to save workout plan');
        }
        setPlanName('');
        setExercises([]);
        fetchWorkoutPlans(token);
      } catch (error) {
        setError('Failed to save workout plan. Please try again.');
      }
    };
  
    const fetchWorkoutPlans = async (token: string) => {
      try {
        const response = await fetch('/api/workout-plans', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch workout plans');
        }
        const data = await response.json();
        setWorkoutPlans(data);
      } catch (error) {
        console.error('Error fetching workout plans:', error);
      }
    };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Personalized Workout Planner</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="fitnessLevel" className="block mb-2">Fitness Level</label>
          <select
            id="fitnessLevel"
            
            className="w-full p-2 border rounded"
          >
            <option value="">Select Fitness Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="targetMuscle" className="block mb-2">Target Muscle</label>
          <select
            id="targetMuscle"
            value={targetMuscle}
            onChange={(e) => setTargetMuscle(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Target Muscle</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="core">Core</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Workout Plan'}
        </button>
      </form>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {exercises.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Generated Workout Plan</h2>
          <input
            type="text"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            placeholder="Enter plan name"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={saveWorkoutPlan}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
          >
            Save Workout Plan
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exercises.map((exercise, index) => (
              <div key={index} className="border rounded p-4">
                <h3 className="font-bold mb-2">{exercise.name}</h3>
                <p><strong>Type:</strong> {exercise.type}</p>
                <p><strong>Muscle:</strong> {exercise.muscle}</p>
                <p><strong>Difficulty:</strong> {exercise.difficulty}</p>
                <p><strong>Instructions:</strong> {exercise.instructions}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {workoutPlans.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Workout Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workoutPlans.map((plan) => (
              <div key={plan.id} className="border rounded p-4">
                <h3 className="font-bold mb-2">{plan.name}</h3>
                <p>Created: {new Date(plan.createdAt).toLocaleDateString()}</p>
                <p>Exercises: {plan.exercises.length}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanner;