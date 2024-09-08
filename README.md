# AI-Powered Blog Post Generator

## Description
An AI-powered application that allows users to create, manage, and publish blog posts using AI assistance. Users can sign up, log in, and generate content based on prompts they provide.

## Features
- User registration and authentication
- AI-generated blog content
- CRUD operations for blog posts
- User profiles and post management
- Comments section (to be implemented)
- Search functionality (to be implemented)
- Analytics dashboard (to be implemented)

## Tech Stack
- **Frontend**: Next.js, React, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, NextAuth
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-post-generator.git
   cd blog-post-generator
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT secret:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5001
     ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

5. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

6. Set up environment variables for the frontend:
   - Create a `.env.local` file in the `frontend` directory and add:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5001/api
     ```

7. Start the frontend server:
   ```bash
   npm run dev
   ```

## Usage
- Navigate to `http://localhost:3000` to access the application.
- Users can sign up, log in, and start generating blog posts.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
