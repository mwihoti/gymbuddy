'use client'

import React, { Component } from 'react';
import classesData from '../lib/classes.json';

type GymClass = {
  id: string;
  name: string;
  time: string;
  trainer: string;
  slots: number;
  description: string;
  location: string;
};

type State = {
  classes: GymClass[];
};

class ClassesT extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      classes: classesData,
    };
  }

  renderClassCard = (gymClass: GymClass) => (
    <div
      key={gymClass.id}
      className="border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-all bg-white"
    >
      <h2 className="text-lg font-semibold text-blue-700">{gymClass.name}</h2>
      <p className="text-sm text-gray-500 mb-1">{gymClass.time}</p>
      <p className="text-sm mb-2">Trainer: <span className="font-medium">{gymClass.trainer}</span></p>
      <p className="text-sm mb-2">Slots Available: <span className="font-medium">{gymClass.slots}</span></p>
      <p className="text-sm text-gray-700 mb-2">{gymClass.description}</p>
      <p className="text-xs text-gray-500 italic">{gymClass.location}</p>
    </div>
  );

  render() {
    const { classes } = this.state;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Available Gym Classes</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map(this.renderClassCard)}
        </div>
      </div>
    );
  }
}

export default ClassesT;
