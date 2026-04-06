# Zomato Clone Project

A simple food delivery application clone built with React and PHP backend.

## Project Structure

- **frontend/** - React frontend application
- **backend/** - PHP backend API
- **database.sql** - Database schema

## Installation

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure your database settings in `.env` file

3. Import the database schema:
```bash
mysql -u username -p database_name < database.sql
```

## Running the Project

### Development Mode

**Frontend:**
```bash
cd frontend
npm start
```
Access at: http://localhost:3000

**Backend:**
Start your local PHP server or use XAMPP/WAMP

### Production Build

**Build the frontend:**
```bash
cd frontend
npm run build
```

The build files will be in the `frontend/build` directory.

## Technologies Used

- **Frontend:** React, React Router, React Icons
- **Backend:** PHP
- **Database:** MySQL
- **Styling:** CSS

## Features

- Restaurant browsing
- Food ordering
- User authentication
- Order tracking
- Search functionality

## Simple Usage

1. Install dependencies as mentioned above
2. Set up your database
3. Run both frontend and backend
4. Access the application in your browser

That's it! Your Zomato clone is ready to use.
