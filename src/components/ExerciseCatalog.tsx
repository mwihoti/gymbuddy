'use client';
import { useState } from 'react'
import { Printer, Download, X } from 'lucide-react'
import { generatePDF } from './actions'
import { getExerciseData } from './exerciseData'

const muscleGroups = [
  "Abductors", "Abs", "Adductors", "Biceps", "Calves", "Chest", "Forearms", "Glutes",
  "Hamstrings", "Hip Flexors", "IT Band", "Lats", "Lower Back", "Upper Back", "Neck",
  "Obliques", "Palmar Fascia", "Plantar Fascia", "Quads", "Shoulders", "Traps", "Triceps"
]

type MuscleGroup = typeof muscleGroups[number]
type EquipmentType = typeof equipmentTypes[number]
type MechanicType = typeof mechanics[number]

const popularExercises = [
   {
    name: "Squats",
    description: "Considered a fundamental exercise, squats work multiple muscle groups and are widely used in various fitness routines.",
    image: "/assets/exercises/squats.png"
  },
  {
    name: "Bench Press",
    description: "A popular exercise, often done with free weights or machines, targeting the chest, shoulders, and triceps.",
    image: "/assets/exercises/chestpress.png"
  },
  {
    name: "Deadlifts",
    description: "A compound exercise, deadlifts engage numerous muscles, making them a staple in strength training.",
    image: "/assets/exercises/deadlifts.png"
  },
  {
    name: "Lunges",
    description: "Effective for building lower body strength and improving balance, lunges can be modified in various ways.",
    image: "/assets/exercises/lunges.png"
  },
  {
    name: "Push-ups",
    description: "A classic bodyweight exercise, push-ups work the chest, shoulders, and triceps.",
    image: "/assets/exercises/pushups.png"
  },
  {
    name: "Pull-ups",
    description: "Another bodyweight exercise, pull-ups are great for building back and arm strength.",
    image: "/assets/exercises/pull-ups.png"
  },
  {
    name: "Dumbbell Shoulder Press",
    description: "This exercise targets the deltoids, triceps, and postural muscles.",
    image: "/assets/exercises/overheadpress.png"
  },
  {
    name: "Overhead Press",
    description: "A popular exercise for developing shoulder and upper body strength.",
    image: "/assets/exercises/overheadpress.png"
  },
  {
    name: "Burpees",
    description: "A full-body workout, burpees are a high-intensity exercise that combines several movements.",
    image: "/assets/exercises/burpeee.png"
  },
  {
  name: "Yoga",
  description: "A holistic practice focusing on flexibility, breathing, and meditation to improve both physical fitness and mental well-being.",
  image: "/assets/exercises/yoga.png"
},
{
  name: "Tai Chi",
  description: "A slow, flowing martial art that enhances balance, coordination, and relaxation while reducing stress.",
  image: "/assets/exercises/taichi.png"
}
]

const equipmentTypes = [
  "Dumbbell", "Barbell", "Bodyweight", "Cable", "Machine", "Exercise Ball", "EZ Bar"
]

const mechanics = ["Compound", "Isolation"]

const exercisesPerMuscle: Record<MuscleGroup, string[]> = {
  Abductors: ["Side Leg Raises", "Hip Abduction Machine", "Clamshells"],
  Abs: ["Crunches", "Planks", "Russian Twists"],
  Biceps: ["Bicep Curls", "Hammer Curls", "Chin-Ups"],
  Calves: ["Calf Raises", "Seated Calf Raises", "Jump Rope"],
  Chest: ["Push-ups", "Chest Press", "Chest Flys"],
  Adductors: ["Side lunge", "Wide squat", "Frog strech"],
  Forearms: ["Wrist Curls", "Reverse Wrist Curls", "Farmer's Walk"],
  Glutes: ["Glute Bridges", "Hip Thrusts", "Bulgarian Split Squats"],
  Hamstrings: ["Leg Curls", "Romanian Deadlifts", "Good Mornings"],
  "Hip Flexors": ["Leg Raises", "Mountain Climbers", "Lunges"],
  "IT Band": ["Foam Rolling", "Side-Lying Leg Lifts", "Clamshells"],
  Lats: ["Lat Pulldown", "Pull-Ups", "Bent-Over Rows"],
  "Lower Back": ["Deadlifts", "Supermans", "Back Extensions"],
  "Upper Back": ["Face Pulls", "Reverse Flys", "T-Bar Rows"],
  Neck: ["Neck Flexion", "Neck Extension", "Neck Side Bends"],
  Obliques: ["Side Planks", "Bicycle Crunches", "Russian Twists"],
  "Palmar Fascia": ["Grip Strengthening", "Finger Extensions", "Hand Squeezes"],
  "Plantar Fascia": ["Toe Stretches", "Calf Raises", "Ball Rolling"],
  Quads: ["Squats", "Lunges", "Leg Press"],
  Shoulders: ["Overhead Press", "Lateral Raises", "Arnold Press"],
  Traps: ["Shrugs", "Farmer's Walk", "Face Pulls"],
  Triceps: ["Tricep Dips", "Tricep Pushdowns", "Skull Crushers"]
}

const exercisesPerEquipment: Record<EquipmentType, string[]> = {
  Dumbbell: ["Dumbbell Bench Press", "Dumbbell Rows", "Dumbbell Lunges"],
  Barbell: ["Barbell Squats", "Barbell Deadlifts", "Barbell Bench Press"],
  Bodyweight: ["Push-ups", "Pull-Ups", "Bodyweight Squats"],
  Cable: ["Cable Flys", "Cable Tricep Pushdowns", "Cable Rows"],
  Machine: ["Leg Press", "Chest Press", "Lat Pulldown"],
  "Exercise Ball": ["Ball Crunches", "Ball Hamstring Curls", "Ball Pikes"],
  "EZ Bar": ["EZ Bar Curl", "EZ Bar Skull Crusher", "EZ Bar Rows"]
}

const exercisesPerMechanics: Record<MechanicType, string[]> = {
  Compound: ["Squats", "Deadlifts", "Bench Press", "Pull-Ups"],
  Isolation: ["Bicep Curls", "Leg Extensions", "Tricep Pushdowns"],
}

export default function ExerciseCatalog() {
  const [activeTab, setActiveTab] = useState("muscle-groups")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const[expandedExercise, setExpandedExercise] = useState<string | null >(null)
  const [enlargedImage, setEnlargeImage] = useState<string | null>(null)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const blob = await generatePDF()
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
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Updated renderExerciseList function with images
  const renderExerciseList = (exercises: string[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {exercises?.map((exercise, index) => {
        const exerciseInfo = getExerciseData(exercise)
        const isExpanded = expandedExercise === exercise
        return (
          <div key={index} 
          className={`border rounded-lg p-4 hover:shado-md transition-all duration-300 bg-white cursor-pointer  ${isExpanded ? 'md:col-span-2 shadow-lg' : ''

          } `}
          onClick={() => setExpandedExercise(isExpanded ? null : exercise)}
          >
            <div className={`flex ${isExpanded ? 'flex-col md:flex-row' : 'items-center'} space-x-4`}>
              <img 
                src={exerciseInfo.image} 
                alt={exercise}
                className={`object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity ${
                  isExpanded ? 'w-60 h-60 md:w-70 md:h-70' : 'w-20 h-20'
                }`}
                onClick={(e => {
                  e.stopPropagation()
                  setEnlargeImage(exerciseInfo.image)
                })}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/exercises/default.png" // fallback
                }}
              />
              <div className="flex-1">
                <h3 className={`font-semibold text-lg text-gray-900 ${isExpanded ? 'text-xl mb-2' : 'text-lg'}`}>{exercise}</h3>
                <p className={`text-gray-600 mt-1 ${isExpanded ? 'text-base p-2': 'text-sm p-4'}`}>{exerciseInfo.description}</p>
                <div className="flex gap-2 mt-2">
                  <span className={`bg-blue-100 text-blue-800 px-2 py-1 rounded ${
                    isExpanded ? 'text-sm' : 'text-xs'
                  }`}>
                    {exerciseInfo.difficulty}
                  </span>
                  <span className={`bg-screen-100 text-green-900 px-2 py-1 rounded ${
                    isExpanded ? 'text-sm' : 'text-xs'
                  }`}>
                    {exerciseInfo.equipment}
                  </span>
                </div>
                {isExpanded && (
                  <div className='mt-4 p-4 bg-gray-50 rounded-lg'>
                    <h4 className='font-semibold text-gray-900 mb-2'>Exercise Details:</h4>
                    <div className='space-y-2 text-sm text-gray-700'>
                      <p><strong>Primary Focuss:</strong> {exerciseInfo.equipment} exercise</p>
                      <p><strong>Difficulty Level:</strong> {exerciseInfo.difficulty}</p>
                     {/* <p><strong>Instructions:</strong> {exerciseInfo.description}</p>*/}
                    </div>
                                  </div>

                )

                }
              </div>
            </div>
            {isExpanded && (
              <div className='mt-4 text-center'>
                <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedExercise(null)
                    }}
                    className='text-blue-600 hover:text-blue-800 text-sm font-medium'>
                      Click to collapse
                    </button>

                </div>
            )}
          </div>
        )
      }) || <div className="text-gray-500">No exercises found.</div>}
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-white font-bold mb-6">Exercise Catalog</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-300 text-xl">
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
              className="cursor-pointer py-10 px-10 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="font-semibold text-gray-900">{group}</h3>
              <p className="text-blue-600 hover:underline mt-2">
                {group} Exercises
              </p>
              <p className="text-gray-600 text-sm mt-2">Don't worry we got you covered. You can exercise at home</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'popular' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularExercises.map((exercise) => (
            
            <div key={exercise.name} className="py-10 px-10 border rounded-lg shadow-sm bg-white">
              <h3 className="font-bold text-xl p-4">{exercise.name}</h3>
              
              <h3 className="font-semibold p-4">{exercise.description}   </h3>
                <div className='p-4'>
                     <img 
                src={exercise.image} 
                alt={exercise}
                className='object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity '
                onClick={(e => {
                  e.stopPropagation()
                  setEnlargeImage(exercise.image)
                })}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/exercises/default.png" // fallback
                }}
              />
                </div>
            
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
              className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="font-semibold text-gray-900">{equipment}</h3>
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
              className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <h3 className="font-semibold text-gray-900">{mechanic}</h3>
              <p className="text-blue-600 hover:underline mt-2">
                {mechanic} Exercises
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{selectedItem} Exercises</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {activeTab === 'muscle-groups' && renderExerciseList(exercisesPerMuscle[selectedItem])}
            {activeTab === 'equipment' && renderExerciseList(exercisesPerEquipment[selectedItem])}
            {activeTab === 'mechanics' && renderExerciseList(exercisesPerMechanics[selectedItem])}
          </div>
        </div>
      )}
    </div>
  )
}