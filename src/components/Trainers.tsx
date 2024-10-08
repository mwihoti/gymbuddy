import React from 'react';

interface Trainer {
  id: number;
  name: string;
  specialties: string[];
  bio: string;
  imageUrl: string;
}

const trainers: Trainer[] = [
  {
    id: 1,
    name: "Jane Doe",
    specialties: ["Cardio", "HIIT", "Nutrition"],
    bio: "Jane is a certified personal trainer with 10 years of experience in high-intensity workouts and nutrition planning.",
    imageUrl: "/api/placeholder/200/200"
  },
  {
    id: 2,
    name: "John Smith",
    specialties: ["Strength Training", "Powerlifting", "Bodybuilding"],
    bio: "John specializes in strength training and has helped numerous clients achieve their muscle-building goals.",
    imageUrl: "/api/placeholder/200/200"
  },
  {
    id: 3,
    name: "Emily Chen",
    specialties: ["Yoga", "Pilates", "Flexibility"],
    bio: "Emily is a yoga master and flexibility expert, focusing on body-mind balance and injury prevention.",
    imageUrl: "/api/placeholder/200/200"
  }
];

const TrainerCard: React.FC<{ trainer: Trainer }> = ({ trainer }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={trainer.imageUrl} alt={trainer.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-xl mb-2">{trainer.name}</h3>
      <p className="text-gray-700 text-base mb-2">{trainer.bio}</p>
      <div className="mt-4">
        <h4 className="font-semibold text-lg mb-2">Specialties:</h4>
        <ul className="list-disc list-inside">
          {trainer.specialties.map((specialty, index) => (
            <li key={index} className="text-gray-700">{specialty}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const TrainerShowcasePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Meet Our KitchenGym Trainers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map(trainer => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>
    </div>
  );
};

export default TrainerShowcasePage;