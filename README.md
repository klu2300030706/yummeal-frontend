# YumMeal Food Delivery Website

## Project Overview

YumMeal is a full-stack food delivery application that allows users to browse restaurants, view menus, and place orders online.

## Technologies Used

This project is built with:

- **Frontend:**
  - React with Vite
  - Tailwind CSS
  - shadcn-ui components
  - React Router for navigation
  - React Query for data fetching

- **Backend:**
  - Node.js with Express
  - MongoDB Atlas for database
  - JWT for authentication
  - Google Places API for restaurant data

## Local Development

To run this project locally, you'll need Node.js & npm installed.

```sh
# Clone the repository
git clone <YOUR_REPO_URL>

# Navigate to the project directory
cd yummeal-website

# Frontend setup
cd frontend
npm install
npm run dev

# In a separate terminal, run the backend
cd backend
npm install
npm run dev
```

## Deployment

This project is deployed on Render:

- **Backend API:** https://yummeal-backend.onrender.com
- **Frontend:** Configured for Render static site hosting

## API Endpoints

- `/api/auth/signup` - Register a new user
- `/api/auth/login` - User login
- `/api/restaurants` - Get restaurant listings
- `/api/restaurants/:id` - Get restaurant details
- `/api/user` - Get user profile information
- `/api/orders` - Create and manage orders
