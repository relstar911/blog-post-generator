# AI-Powered Blog Post Generator

## Description
An AI-powered application that allows users to create, manage, and publish blog posts using AI assistance. Users can sign up, log in, and generate content based on various input methods including text prompts, URLs, and PDF uploads.

## Current Project Status
This project is currently in active development. The basic structure and many core features are implemented, but some functionalities are still being refined and expanded.

## Features
- [x] User registration and authentication (partially implemented)
- [x] AI-generated blog content from multiple input sources:
  - [x] Text prompts
  - [x] URL content scraping
  - [x] PDF document analysis
- [x] Basic CRUD operations for blog posts
- [ ] User profiles and post management (in progress)
- [x] Responsive design with Tailwind CSS
- [x] Real-time content generation feedback
- [x] Error handling and loading states
- [ ] Comments section (planned)
- [x] Enhanced PDF parsing capabilities
- [x] Improved web scraping for URL inputs

## Tech Stack
- **Frontend**: Next.js, React, Axios, TypeScript
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, NextAuth
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API
- **Testing**: Jest, Supertest (backend only currently)

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

2. Install all dependencies:
   ```bash
   npm run install-all
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
   cd backend
   npm run dev
   ```

5. In a new terminal, start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. Set up environment variables for the frontend:
   - Create a `.env.local` file in the `frontend` directory and add:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5001/api
     NEXTAUTH_URL=http://localhost:3000
     NEXTAUTH_SECRET=your_nextauth_secret
     ```

## Usage
- Navigate to `http://localhost:3000` to access the application.
- Sign up or log in to start creating blog posts.
- Use the various input methods (text prompt, URL, PDF upload) to generate content.
- Edit, save, and manage your blog posts.

## Testing
To run the backend tests:
```bash
cd backend
npm test
```

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

## Deployment

### Backend Deployment

1. Build the Docker image:
   ```bash
   cd backend
   docker build -t blog-post-generator-backend .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5001:5001 -e MONGODB_URI=your_mongodb_uri -e JWT_SECRET=your_jwt_secret -e OPENAI_API_KEY=your_openai_api_key blog-post-generator-backend
   ```

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

Follow the prompts to complete the deployment.

## Authors

* **Arda Hüyüktepe** - *AI Powered Blog Post Generator* - [relstar911](https://github.com/relstar911)

See also the list of [contributors](https://github.com/relstar911/blog-post-generator/contributors) who participated in this project.
