'use client'
import { useState } from 'react'

// Mock database of exercises
const exerciseDatabase = {
  chest: [
    { name: "Bench Press", instructions: "Lie on a flat bench, lower the bar to your chest, then push it back up." },
    { name: "Push-Ups", instructions: "Start in a plank position, lower your body until your chest nearly touches the floor, then push back up." },
    { name: "Dumbbell Flyes", instructions: "Lie on a bench with dumbbells extended above your chest, lower them out to the sides, then bring them back up." },
  ],
  back: [
    { name: "Pull-Ups", instructions: "Hang from a bar with palms facing away, pull yourself up until your chin is over the bar." },
    { name: "Bent-Over Rows", instructions: "Bend at the hips, keep your back straight, pull a barbell or dumbbells to your lower chest." },
    { name: "Lat Pull-Downs", instructions: "Sit at a cable machine, grab the bar with a wide grip, pull it down to your chest." },
  ],
  legs: [
    { name: "Squats", instructions: "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then stand back up." },
    { name: "Lunges", instructions: "Step forward with one leg, lowering your hips until both knees are bent at 90-degree angles." },
    { name: "Deadlifts", instructions: "Stand with feet hip-width apart, bend at hips and knees to lower the bar against your shins, then lift by extending hips and knees." },
  ],
  // Add more muscle groups and exercises as needed
}

export default function WorkoutPlanner() {
  const [muscle, setMuscle] = useState("")
  const [workout, setWorkout] = useState<Array<{ name: string; instructions: string }>>([])

  const generateWorkout = () => {
    const lowercaseMuscle = muscle.toLowerCase()
    if (exerciseDatabase[lowercaseMuscle]) {
      setWorkout(exerciseDatabase[lowercaseMuscle])
    } else {
      setWorkout([])
    }
  }

  return (
    <div className="container mx-auto p-4 flex-grow flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Workout Planner</h1>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="muscle" className="block text-sm font-medium text-gray-700 mb-1">
              Muscle to train
            </label>
            <input
              type="text"
              id="muscle"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., chest, back, legs"
              value={muscle}
              onChange={(e) => setMuscle(e.target.value)}
            />
          </div>
          <button
            onClick={generateWorkout}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Generate Workout
          </button>
        </div>
      </div>

      {workout.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Workout Plan</h2>
          <div className="h-[400px] overflow-y-auto border border-gray-200 rounded-md p-4">
            {workout.map((exercise, index) => (
              <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
                <p className="text-gray-600">{exercise.instructions}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          Enter a muscle group and click "Generate Workout" to see your personalized plan.
        </p>
      )}
    </div>
  )
}