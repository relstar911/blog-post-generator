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

# Contributors

* **Arda Hüyüktepe** - *Initial work* - [relstar911](https://github.com/relstar911)
* **Contributor Name** - *Feature X* - [ContributorUsername](https://github.com/ContributorUsername)
