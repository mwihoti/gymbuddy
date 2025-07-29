'use client'
import { useState } from 'react'

// Define interfaces for our data structures
interface Exercise {
  name: string
  instructions: string
}

interface ExerciseDatabase {
  [key: string]: Exercise[]
}

// Mock database of exercises with proper typing
const exerciseDatabase: ExerciseDatabase = {
  chest: [
    { name: "Bench Press", instructions: "Lie on a flat bench, lower the bar to your chest, then push it back up." },
    { name: "Push-Ups", instructions: "Start in a plank position, lower your body until your chest nearly touches the floor, then push back up." },
    { name: "Dumbbell Flyes", instructions: "Lie on a bench with dumbbells extended above your chest, lower them out to the sides, then bring them back up." },
    { name: "Incline Bench Press", instructions: "Lie on an incline bench, lower the bar to your chest, then push it back up." },
    { name: "Chest Dips", instructions: "Use parallel bars, lower your body by bending your arms, then push back up." },
  ],
  back: [
    { name: "Pull-Ups", instructions: "Hang from a bar with palms facing away, pull yourself up until your chin is over the bar." },
    { name: "Bent-Over Rows", instructions: "Bend at the hips, keep your back straight, pull a barbell or dumbbells to your lower chest." },
    { name: "Lat Pull-Downs", instructions: "Sit at a cable machine, grab the bar with a wide grip, pull it down to your chest." },
    { name: "T-Bar Rows", instructions: "Stand over a T-bar, bend at the hips, and pull the weight to your chest." },
    { name: "Deadlifts", instructions: "Stand with feet hip-width apart, lift the barbell by extending your hips and knees." },
  ],
  legs: [
    { name: "Squats", instructions: "Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then stand back up." },
    { name: "Lunges", instructions: "Step forward with one leg, lowering your hips until both knees are bent at 90-degree angles." },
    { name: "Deadlifts", instructions: "Stand with feet hip-width apart, bend at hips and knees to lower the bar against your shins, then lift by extending hips and knees." },
    { name: "Leg Press", instructions: "Sit at the leg press machine, push the platform away with your legs." },
    { name: "Bulgarian Split Squat", instructions: "Place one foot behind on a bench, lower your body with the front leg, then return to standing." },
  ],
  shoulders: [
    { name: "Overhead Press", instructions: "Stand or sit with a barbell or dumbbells, press the weight overhead." },
    { name: "Lateral Raises", instructions: "Hold dumbbells at your sides, raise your arms out to the sides until shoulder height." },
    { name: "Arnold Press", instructions: "Start with dumbbells in front of your chest, rotate your wrists as you press them overhead." },
  ],
  arms: [
    { name: "Bicep Curls", instructions: "Hold a barbell or dumbbells, curl the weight up to your shoulders." },
    { name: "Tricep Dips", instructions: "Use parallel bars or a bench, lower your body by bending your arms, then push back up." },
    { name: "Hammer Curls", instructions: "Hold dumbbells with palms facing inward, curl the weight towards your shoulders." },
    { name: "Skull Crushers", instructions: "Lie on a bench, lower a barbell or dumbbells towards your forehead, then extend your arms." },
  ],
  abs: [
    { name: "Plank", instructions: "Hold a plank position with forearms on the ground and body in a straight line." },
    { name: "Crunches", instructions: "Lie on your back, lift your upper body towards your knees." },
    { name: "Leg Raises", instructions: "Lie on your back, lift your legs towards the ceiling while keeping them straight." },
    { name: "Russian Twists", instructions: "Sit on the floor, rotate your torso side to side while holding a weight." },
  ],
} as const

export default function WorkoutPlanner() {
  const [muscle, setMuscle] = useState("")
  const [workout, setWorkout] = useState<Exercise[]>([])

  const generateWorkout = () => {
    const lowercaseMuscle = muscle.toLowerCase()
    const exercises = exerciseDatabase[lowercaseMuscle as keyof typeof exerciseDatabase]
    if (exercises) {
      setWorkout(exercises)
    } else {
      setWorkout([])
    }
  }

  const validMuscleGroups = Object.keys(exerciseDatabase).join(', ')

  return (
    <div className="flex flex-col  items-center justify-center mx-auto p-4">
      <h1 className="text-3xl  font-bold mb-6">Workout Planner</h1>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="w-full sm:w-auto">
            <label htmlFor="muscle" className="block text-l text-gray-800 mb-6 font-bold">
              Muscle to train
            </label>
            <input
              type="text"
              id="muscle"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`e.g., ${validMuscleGroups}`}
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
        <p className="text-gray-800">
          Enter a muscle group ({validMuscleGroups}) and click "Generate Workout" to see your personalized plan.
        </p>
      )}
    </div>
  )
}