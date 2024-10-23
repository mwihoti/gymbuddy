'use server'

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

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

export async function generatePDF() {
  const pdfDoc = await PDFDocument.create()
  let page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontSize = 12
  const lineHeight = fontSize * 1.2

  let yOffset = height - 50

  // Title
  page.drawText('Exercise Catalog', {
    x: 50,
    y: yOffset,
    size: 24,
    font,
    color: rgb(0, 0.53, 0.71),
  })

  yOffset -= lineHeight * 2

  // Function to add a section to the PDF
  const addSection = (title, exercises) => {
    if (yOffset < 100) {
      page = pdfDoc.addPage()
      yOffset = height - 50
    }

    page.drawText(title, {
      x: 50,
      y: yOffset,
      size: fontSize + 4,
      font,
      color: rgb(0, 0.53, 0.71),
    })

    yOffset -= lineHeight * 2

    for (const [category, exerciseList] of Object.entries(exercises)) {
      if (yOffset < 100) {
        page = pdfDoc.addPage()
        yOffset = height - 50
      }

      page.drawText(category, {
        x: 50,
        y: yOffset,
        size: fontSize + 2,
        font,
        color: rgb(0, 0, 0),
      })

      yOffset -= lineHeight

      exerciseList.forEach((exercise) => {
        page.drawText(`• ${exercise}`, {
          x: 70,
          y: yOffset,
          size: fontSize,
          font,
          color: rgb(0.3, 0.3, 0.3),
        })
        yOffset -= lineHeight
      })

      yOffset -= lineHeight
    }
  }

  // Add sections to the PDF
  addSection('Exercises by Muscle Group', exercisesPerMuscle)
  addSection('Exercises by Equipment', exercisesPerEquipment)
  addSection('Exercises by Mechanics', exercisesPerMechanics)

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}