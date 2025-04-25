# Skill Matcher

A full-stack web application for managing employee skills and project assignments. Built with React.js for the frontend and Node.js/Express for the backend.

## Features

- Add and manage employees with their skills
- Create and manage projects with required skills
- Match employees to projects based on skill requirements
- View all employees and projects in a dashboard
- Modern and responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios (for API calls)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/employee-skill-manager.git
cd employee-skill-manager
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
employee-skill-manager/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── README.md
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── README.md
└── README.md
```

## API Endpoints

### Employees
- `GET /api/employees/all` - Get all employees
- `POST /api/employees/add` - Add a new employee
- `GET /api/employees/:id` - Get employee by ID

### Projects
- `GET /api/projects/all` - Get all projects
- `POST /api/projects/add` - Add a new project
- `GET /api/projects/:id` - Get project by ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/) 