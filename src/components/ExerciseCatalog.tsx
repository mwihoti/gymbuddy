'use client';
import { useState } from 'react'
import { Printer, Download } from 'lucide-react'
import { generatePDF } from './actions'

const muscleGroups = [
  "Abductors", "Abs", "Adductors", "Biceps", "Calves", "Chest", "Forearms", "Glutes",
  "Hamstrings", "Hip Flexors", "IT Band", "Lats", "Lower Back", "Upper Back", "Neck",
  "Obliques", "Palmar Fascia", "Plantar Fascia", "Quads", "Shoulders", "Traps", "Triceps"
]

const popularExercises = [
  { name: "Dumbbell Lateral Raise", views: "9.3M", comments: 80 },
  { name: "Dumbbell Bench Press", views: "6.1M", comments: 82 },
  { name: "Bent Over Dumbbell Row", views: "5.4M", comments: 15 },
  { name: "One Arm Dumbbell Row", views: "8.2M", comments: 47 },
  { name: "Bent Over Row", views: "7.7M", comments: 47 },
  { name: "Dumbbell Pullover", views: "5.2M", comments: 98 },
]

const equipmentTypes = [
  "Dumbbell", "Barbell", "Bodyweight", "Cable", "Machine", "Exercise Ball", "EZ Bar"
]

const mechanics = ["Compound", "Isolation"]

const exercisesPerMuscle = {
  Abductors: ["Side Leg Raises", "Hip Abduction Machine", "Clamshells"],
  Abs: ["Crunches", "Planks", "Russian Twists"],
  Biceps: ["Bicep Curls", "Hammer Curls", "Chin-Ups"],
  Biceps: ["Bicep Curls", "Hammer Curls", "Chin-Ups"],
  Calves: ["Calf Raises", "Seated Calf Raises", "Jump Rope"],
  Chest: ["Push-ups", "Chest Press", "Chest Flys"],
  Forearms: ["Wrist Curls", "Reverse Wrist Curls", "Farmer's Walk"],
  Glutes: ["Glute Bridges", "Hip Thrusts", "Bulgarian Split Squats"],
  Hamstrings: ["Leg Curls", "Romanian Deadlifts", "Good Mornings"],
  Hip Flexors: ["Leg Raises", "Mountain Climbers", "Lunges"],
  IT Band: ["Foam Rolling", "Side-Lying Leg Lifts", "Clamshells"],
  Lats: ["Lat Pulldown", "Pull-Ups", "Bent-Over Rows"],
  Lower Back: ["Deadlifts", "Supermans", "Back Extensions"],
  Upper Back: ["Face Pulls", "Reverse Flys", "T-Bar Rows"],
  Neck: ["Neck Flexion", "Neck Extension", "Neck Side Bends"],
  Obliques: ["Side Planks", "Bicycle Crunches", "Russian Twists"],
  Palmar Fascia: ["Grip Strengthening", "Finger Extensions", "Hand Squeezes"],
  Plantar Fascia: ["Toe Stretches", "Calf Raises", "Ball Rolling"],
  Quads: ["Squats", "Lunges", "Leg Press"],
  Shoulders: ["Overhead Press", "Lateral Raises", "Arnold Press"],
  Traps: ["Shrugs", "Farmer's Walk", "Face Pulls"],
  Triceps: ["Tricep Dips", "Tricep Pushdowns", "Skull Crushers"]
}

const exercisesPerEquipment = {
  Dumbbell: ["Dumbbell Bench Press", "Dumbbell Rows", "Dumbbell Lunges"],
  Barbell: ["Barbell Squats", "Barbell Deadlifts", "Barbell Bench Press"],
  Bodyweight: ["Push-ups", "Pull-ups", "Bodyweight Squats"],
  Cable: ["Cable Flys", "Cable Tricep Pushdowns", "Cable Rows"],
  Machine: ["Leg Press", "Chest Press", "Lat Pulldown"],
  Exercise Ball: ["Ball Crunches", "Ball Hamstring Curls", "Ball Pikes"],
  EZ Bar: ["EZ Bar Curl", "EZ Bar Skull Crusher", "EZ Bar Rows"]
}

const exercisesPerMechanics = {
  Compound: ["Squats", "Deadlifts", "Bench Press", "Pull-ups"],
  Isolation: ["Bicep Curls", "Leg Extensions", "Tricep Pushdowns"],
}

export default function ExerciseCatalog() {
  const [activeTab, setActiveTab] = useState("muscle-groups")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const response = await generatePDF()
      
      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'exercise_catalog.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const renderExerciseList = (exercises) => (
    <ul className="space-y-2">
      {exercises?.map((exercise, index) => (
        <li key={index} className="text-sm">{exercise}</li>
      )) || <li>No exercises found.</li>}
    </ul>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Exercise Catalog</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Choose the muscle group you want to target. Use the sort and filter options to find the best exercises for your equipment, experience, and goals.
        </p>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Printer className="mr-2 h-4 w-4" /> Print
          </button>
          <button onClick={handleDownloadPDF} disabled={isGeneratingPDF} className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <Download className="mr-2 h-4 w-4" /> 
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="sm:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value="muscle-groups">Muscle Groups</option>
            <option value="popular">Most Popular</option>
            <option value="equipment">By Equipment</option>
            <option value="mechanics">By Mechanics</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {['muscle-groups', 'popular', 'equipment', 'mechanics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'muscle-groups' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {muscleGroups.map((group) => (
            <div
              key={group}
              onClick={() => setSelectedItem(group)}
              className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{group}</h3>
              <p className="text-blue-600 hover:underline mt-2">
                {group} Exercises
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'popular' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularExercises.map((exercise) => (
            <div key={exercise.name} className="p-4 border rounded-lg shadow-sm">
              <h3 className="font-semibold">{exercise.name}</h3>
              <p className="text-gray-600">{exercise.views} Views</p>
              <p className="text-gray-600">{exercise.comments} Comments</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'equipment' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {equipmentTypes.map((equipment) => (
            <div
              key={equipment}
              onClick={() => setSelectedItem(equipment)}
              className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{equipment}</h3>
              <p className="text-blue-600 hover:underline mt-2">
                {equipment} Exercises
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mechanics' && (
        <div className="grid grid-cols-2 gap-4">
          {mechanics.map((mechanic) => (
            <div
              key={mechanic}
              onClick={() => setSelectedItem(mechanic)}
              className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold">{mechanic}</h3>
              <p className="text-blue-600 hover:underline mt-2">
                {mechanic} Exercises
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedItem} Exercises</h2>
            {activeTab === 'muscle-groups' && renderExerciseList(exercisesPerMuscle[selectedItem])}
            {activeTab === 'equipment' && renderExerciseList(exercisesPerEquipment[selectedItem])}
            {activeTab === 'mechanics' && renderExerciseList(exercisesPerMechanics[selectedItem])}
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}