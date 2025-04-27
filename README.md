# Skill Matcher

A full-stack web application for managing employee skills and project assignments. Built with React.js for the frontend and Node.js/Express for the backend.

## Features

- Add and manage employees with their skills
- Create and manage projects with required skills
- Match employees to projects based on skill requirements
- View all employees and projects in a dashboard
- Modern and responsive UI with Tailwind CSS
- Interactive data visualization with Chart.js
- Secure authentication with JWT

## Tech Stack

### Frontend
- React.js
- Vite
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
git clone https://github.com/akaadityagupta/Skill-Matcher.git
cd skill-matcher
```

2. Set up the backend:
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_connection_string
PORT=5000"> .env
```

3. Set up the frontend:
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npx nodemon  # Uses nodemon for development
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev  # Uses Vite for development
```

3. Open your browser and navigate to `http://localhost:5173` (Vite's default port)

## Project Structure

```
Skill-Matcher/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── server.js
│   └── package.json
└── README.md
```

## API Endpoints



### Employees
- `GET /api/employees/all` - Get all employees
- `POST /api/employees/add` - Add a new employee
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Projects
- `GET /api/projects/all` - Get all projects
- `POST /api/projects/add` - Add a new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Development

- Frontend uses Vite for fast development and building
- Backend uses nodemon for automatic server restart
- ESLint configuration for code quality
- Tailwind CSS for styling
- JWT for secure authentication

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
- [Vite](https://vitejs.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
