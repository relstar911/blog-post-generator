# AI-Powered Blog Post Generator

## Description
An AI-powered application that allows users to create, manage, and publish blog posts using AI assistance. Users can sign up, log in, and generate content based on various input methods including text prompts, URLs, and PDF uploads.

## Features
- User registration and authentication
- AI-generated blog content from multiple input sources:
  - Text prompts
  - URL content scraping
  - PDF document analysis
- CRUD operations for blog posts
- User profiles and post management
- Responsive design with Tailwind CSS
- Real-time content generation feedback
- Error handling and loading states
- Comments section (to be implemented)
- Search functionality (to be implemented)
- Analytics dashboard (to be implemented)

## Tech Stack
- **Frontend**: Next.js, React, Axios, TypeScript
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, NextAuth
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- OpenAI API key

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
   - Create a `.env` file in the `backend` directory and add:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5001
     OPENAI_API_KEY=your_openai_api_key
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
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_nextauth_secret
     ```

7. Start the frontend server:
   ```bash
   npm run dev
   ```

## Usage
- Navigate to `http://localhost:3000` to access the application.
- Sign up or log in to start creating blog posts.
- Use the various input methods (text prompt, URL, PDF upload) to generate content.
- Edit, save, and manage your blog posts.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

Please ensure your code adheres to the existing style and includes appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
