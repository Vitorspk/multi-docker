# Multi-Docker Application

A multi-container Docker application demonstrating microservices architecture with React, Node.js, Redis, PostgreSQL, and Nginx.

## 🏗️ Architecture Overview

This application implements a Fibonacci calculator using a microservices architecture with the following components:

- **Client**: React frontend application
- **Server**: Node.js Express API backend
- **Worker**: Node.js background worker for Fibonacci calculations
- **Nginx**: Reverse proxy for routing requests
- **PostgreSQL**: Database for persistent storage
- **Redis**: In-memory data store for caching and message passing

## 📁 Project Structure

```
.
├── client/                 # React frontend application
│   ├── src/               # React source code
│   ├── nginx/             # Nginx config for client
│   ├── Dockerfile         # Production Docker config
│   └── Dockerfile.dev     # Development Docker config
├── server/                # Express API server
│   ├── index.js          # Main server application
│   ├── keys.js           # Configuration keys
│   ├── Dockerfile        # Production Docker config
│   └── Dockerfile.dev    # Development Docker config
├── worker/                # Background worker service
│   ├── index.js          # Worker logic for Fibonacci
│   ├── keys.js           # Configuration keys
│   ├── Dockerfile        # Production Docker config
│   └── Dockerfile.dev    # Development Docker config
├── nginx/                 # Nginx reverse proxy
│   ├── default.conf      # Nginx routing configuration
│   ├── Dockerfile        # Production Docker config
│   └── Dockerfile.dev    # Development Docker config
├── docker-compose.yml     # Local development orchestration
├── Dockerrun.aws.json    # AWS Elastic Beanstalk config
├── .travis.yml           # Travis CI pipeline
└── .github/workflows/    # GitHub Actions workflows
```

## 🚀 How It Works

### Application Flow

1. **User Interface**: Users access the React frontend to input numbers for Fibonacci calculation
2. **API Server**: Express server handles HTTP requests and manages data flow
3. **Data Storage**: 
   - PostgreSQL stores all submitted indexes
   - Redis caches calculated values and manages the work queue
4. **Background Processing**: Worker service subscribes to Redis events and calculates Fibonacci values
5. **Routing**: Nginx reverse proxy routes traffic between frontend and backend services

### Service Communication

- Frontend (`/`) → Nginx → React Client (port 3000)
- API calls (`/api/*`) → Nginx → Express Server (port 5000)
- Worker subscribes to Redis pub/sub for new calculation requests
- Server publishes calculation requests to Redis

## 🛠️ Technology Stack

### Frontend
- **React**: UI framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **Redis Client**: Redis integration
- **pg (node-postgres)**: PostgreSQL client

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and load balancer
- **PostgreSQL**: Relational database
- **Redis**: In-memory data structure store

### CI/CD
- **Travis CI**: Continuous integration and deployment
- **GitHub Actions**: Automated workflows for PR reviews
- **AWS Elastic Beanstalk**: Production deployment platform
- **Docker Hub**: Container registry

## 📋 Prerequisites

- Docker and Docker Compose installed
- Node.js and npm (for local development)
- AWS account (for production deployment)
- Docker Hub account (for image registry)

## 🔧 Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Vitorspk/multi-docker.git
cd multi-docker
```

### 2. Start the development environment
```bash
docker-compose up
```

This will start all services in development mode with hot reloading enabled.

### 3. Access the application
- Frontend: http://localhost:3050
- API Server: http://localhost:3050/api

## 🏭 Production Build

### Build production images
```bash
docker build -t vitorspk/multi-client ./client
docker build -t vitorspk/multi-nginx ./nginx
docker build -t vitorspk/multi-server ./server
docker build -t vitorspk/multi-worker ./worker
```

### Push to Docker Hub
```bash
docker push vitorspk/multi-client
docker push vitorspk/multi-nginx
docker push vitorspk/multi-server
docker push vitorspk/multi-worker
```

## 🚢 Deployment

### Travis CI Pipeline

The application uses Travis CI for automated deployment:

1. **Test Phase**: Builds and runs tests on the client application
2. **Build Phase**: Creates production Docker images for all services
3. **Push Phase**: Pushes images to Docker Hub
4. **Deploy Phase**: Deploys to AWS Elastic Beanstalk

### AWS Elastic Beanstalk

The application is configured to deploy to AWS Elastic Beanstalk using:
- Multi-container Docker platform
- Container definitions in `Dockerrun.aws.json`
- Environment: `MultiDocker-env`
- Region: `us-east-1`

## 🔌 API Endpoints

### `GET /`
Health check endpoint
- Response: `"Hi"`

### `GET /values/all`
Retrieve all submitted indexes from PostgreSQL
- Response: Array of objects with submitted numbers

### `GET /values/current`
Get current calculated values from Redis cache
- Response: Object with index-value pairs

### `POST /values`
Submit a new index for Fibonacci calculation
- Request body: `{ "index": number }`
- Constraint: Index must be ≤ 40
- Response: `{ "working": true }`

## 🔐 Environment Variables

### Server Service
- `REDIS_HOST`: Redis server hostname
- `REDIS_PORT`: Redis server port (default: 6379)
- `PGUSER`: PostgreSQL username
- `PGHOST`: PostgreSQL hostname
- `PGDATABASE`: PostgreSQL database name
- `PGPASSWORD`: PostgreSQL password
- `PGPORT`: PostgreSQL port (default: 5432)

### Worker Service
- `REDIS_HOST`: Redis server hostname
- `REDIS_PORT`: Redis server port

## 🧪 Testing

Run tests for the client application:
```bash
docker run vitorspk/react-test npm run test -- --coverage
```

## 📝 Configuration Files

### docker-compose.yml
Defines the multi-container setup for local development with service dependencies and environment variables.

### Dockerrun.aws.json
AWS Elastic Beanstalk configuration for multi-container Docker deployment in production.

### nginx/default.conf
Nginx reverse proxy configuration for routing between frontend and backend services.

### .travis.yml
Travis CI pipeline configuration for automated testing, building, and deployment.

## 🤖 GitHub Actions

The repository includes GitHub Actions workflows for:
- **claude.yml**: Automated code assistance and task execution
- **claude-code-review.yml**: Automated code review on pull requests

## 🏷️ Container Images

Production container images are available on Docker Hub:
- `vitorspk/multi-client`: React frontend
- `vitorspk/multi-server`: Express API server
- `vitorspk/multi-worker`: Background worker
- `vitorspk/multi-nginx`: Nginx reverse proxy

## 📈 Scaling Considerations

- **Horizontal Scaling**: Each service can be scaled independently
- **Load Balancing**: Nginx can distribute traffic across multiple instances
- **Caching**: Redis reduces database load for frequently accessed data
- **Background Processing**: Worker service handles CPU-intensive calculations asynchronously

## 🛡️ Security Notes

- Environment variables should be managed through secure configuration management
- Database credentials should use secrets management in production
- CORS is configured on the Express server for cross-origin requests
- Nginx provides an additional security layer between client and services

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [Travis CI Documentation](https://docs.travis-ci.com/)

## 📄 License

This project is open source. Please check with the repository owner for specific license information.