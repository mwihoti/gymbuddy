# KitchenGym

Welcome to **KitchenGym**, a dynamic platform designed to help kitchenGym gym-goers plan workouts, book training sessions, and manage personal fitness goals with trainers.

## Features

- **User Authentication**: Secure signup and login functionality, including email verification.
- **Trainer & Client Roles**: Users can register as clients or trainers, each with distinct functionalities.
  - **Clients** can book training sessions and manage their fitness plans.
  - **Trainers** can create workout plans, assign exercises, and track client progress.
- **Booking System**: Clients can book training classes and sessions with trainers.
- **Workout Plans**: Trainers can create custom workout plans, including specific exercises and training goals.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Node.js, Prisma ORM, PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS
- **API**: RESTful API using Next.js API routes

## Getting Started

Follow the instructions below to get started with KitchenGym locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Yarn](https://yarnpkg.com/)
- [Prisma CLI](https://www.prisma.io/)

```
Environment Variables
Create a .env file in the root directory and add the following environment variables:

DATABASE_URL=postgresql://youruser:yourpassword@localhost:5432/kitchengym
JWT_SECRET=your_secret_key
```



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
