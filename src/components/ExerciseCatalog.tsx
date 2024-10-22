'use client'
import React, { useState } from 'react';
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
  // ... add exercises for other muscle groups
}

const exercisesPerEquipment = {
  Dumbbell: ["Dumbbell Bench Press", "Dumbbell Rows", "Dumbbell Lunges"],
  Barbell: ["Barbell Squats", "Barbell Deadlifts", "Barbell Bench Press"],
  Bodyweight: ["Push-ups", "Pull-ups", "Bodyweight Squats"],
  // ... add exercises for other equipment types
}

const exercisesPerMechanics = {
  Compound: ["Squats", "Deadlifts", "Bench Press", "Pull-ups"],
  Isolation: ["Bicep Curls", "Leg Extensions", "Tricep Pushdowns"],
}

export default function ExerciseCatalog() {
  const [activeTab, setActiveTab] = useState("muscle-groups")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [selectedDialog, setSelectedDialog] = useState(null)

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
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Exercise Catalog</h1>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Choose the muscle group you want to target. Use the sort and filter options to find the best exercises for your equipment, experience, and goals.
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => window.print()} 
            className="inline-flex items-center px-3 py-2 text-sm font-medium border rounded-md hover:bg-gray-50"
          >
            <Printer className="mr-2 h-4 w-4" /> Print
          </button>
          <button 
            onClick={handleDownloadPDF} 
            disabled={isGeneratingPDF}
            className="inline-flex items-center px-3 py-2 text-sm font-medium border rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <div className="border-b">
          <nav className="-mb-px flex space-x-8">
            {['muscle-groups', 'popular', 'equipment', 'mechanics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === 'muscle-groups' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {muscleGroups.map((group) => (
              <div
                key={group}
                onClick={() => setSelectedDialog(group)}
                className="bg-white rounded-lg border shadow-sm hover:bg-gray-50 cursor-pointer transition-colors p-4"
              >
                <h3 className="text-lg font-semibold mb-2">{group}</h3>
                <p className="text-blue-600 hover:underline">
                  {group} Exercises
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'popular' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularExercises.map((exercise) => (
              <div
                key={exercise.name}
                className="bg-white rounded-lg border shadow-sm p-4"
              >
                <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
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
                onClick={() => setSelectedDialog(equipment)}
                className="bg-white rounded-lg border shadow-sm hover:bg-gray-50 cursor-pointer transition-colors p-4"
              >
                <h3 className="text-lg font-semibold mb-2">{equipment}</h3>
                <p className="text-blue-600 hover:underline">
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
                onClick={() => setSelectedDialog(mechanic)}
                className="bg-white rounded-lg border shadow-sm hover:bg-gray-50 cursor-pointer transition-colors p-4"
              >
                <h3 className="text-lg font-semibold mb-2">{mechanic}</h3>
                <p className="text-blue-600 hover:underline">
                  {mechanic} Exercises
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {selectedDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedDialog} Exercises
                </h2>
                <button
                  onClick={() => setSelectedDialog(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto border rounded-md p-4">
                <ul className="space-y-2">
                  {(activeTab === 'muscle-groups' && exercisesPerMuscle[selectedDialog] ||
                    activeTab === 'equipment' && exercisesPerEquipment[selectedDialog] ||
                    activeTab === 'mechanics' && exercisesPerMechanics[selectedDialog] ||
                    []
                  ).map((exercise, index) => (
                    <li key={index} className="text-sm">{exercise}</li>
                  )) || <li>No exercises found.</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}