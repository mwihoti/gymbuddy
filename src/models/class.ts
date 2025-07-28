import React from 'react'

export default function classModel () {

  interface ClassModel {
    name: string;
    time: string;
    trainer: string;
    slots: number;
    description: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  return (
    <div>class</div>
  )
}
