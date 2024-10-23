'use server'

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface ExerciseCategories {
  [category: string]: string[]
}

const exercisesPerMuscle: ExerciseCategories = {
  Abductors: ["Side Leg Raises", "Hip Abduction Machine", "Clamshells"],
  Abs: ["Crunches", "Planks", "Russian Twists"],
  Biceps: ["Bicep Curls", "Hammer Curls", "Chin-Ups"],
  // ... add exercises for other muscle groups
}

const exercisesPerEquipment: ExerciseCategories = {
  Dumbbell: ["Dumbbell Bench Press", "Dumbbell Rows", "Dumbbell Lunges"],
  Barbell: ["Barbell Squats", "Barbell Deadlifts", "Barbell Bench Press"],
  Bodyweight: ["Push-ups", "Pull-ups", "Bodyweight Squats"],
  // ... add exercises for other equipment types
}

const exercisesPerMechanics: ExerciseCategories = {
  Compound: ["Squats", "Deadlifts", "Bench Press", "Pull-ups"],
  Isolation: ["Bicep Curls", "Leg Extensions", "Tricep Pushdowns"],
}

export async function generatePDF(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontSize = 12
  const lineHeight = fontSize * 1.2

  let currentY = height - 50

  // Title
  page.drawText('Exercise Catalog', {
    x: 50,
    y: currentY,
    size: 24,
    font,
    color: rgb(0, 0.53, 0.71),
  })

  currentY -= lineHeight * 2

  // Function to add a section to the PDF
  const addSection = (title: string, exercises: ExerciseCategories): void => {
    if (currentY < 100) {
      page = pdfDoc.addPage()
      currentY = height - 50
    }

    page.drawText(title, {
      x: 50,
      y: currentY,
      size: fontSize + 4,
      font,
      color: rgb(0, 0.53, 0.71),
    })

    currentY -= lineHeight * 2

    Object.entries(exercises).forEach(([category, exerciseList]) => {
      if (currentY < 100) {
        page = pdfDoc.addPage()
        currentY = height - 50
      }

      page.drawText(category, {
        x: 50,
        y: currentY,
        size: fontSize + 2,
        font,
        color: rgb(0, 0, 0),
      })

      currentY -= lineHeight

      exerciseList.forEach((exercise) => {
        if (currentY < 100) {
          page = pdfDoc.addPage()
          currentY = height - 50
        }

        page.drawText(`• ${exercise}`, {
          x: 70,
          y: currentY,
          size: fontSize,
          font,
          color: rgb(0.3, 0.3, 0.3),
        })
        currentY -= lineHeight
      })

      currentY -= lineHeight
    })
  }

  // Add sections to the PDF
  addSection('Exercises by Muscle Group', exercisesPerMuscle)
  addSection('Exercises by Equipment', exercisesPerEquipment)
  addSection('Exercises by Mechanics', exercisesPerMechanics)

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}