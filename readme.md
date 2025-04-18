# DeepCoder API Proxy

A Node.js server that provides a proxy API for accessing DeepCoder AI models through OpenRouter. This server can be deployed on Render.com and published on RapidAPI for monetization.

## Features

- Proxy API for OpenRouter's DeepCoder models
- Environment-based configuration
- CORS enabled for cross-origin requests
- Error handling and logging
- Health check endpoint
- Ready for deployment on Render.com
- Suitable for RapidAPI publication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenRouter API key

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd deepseek-api-creation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your-api-key
   SITE_URL=https://your-site-url.com
   SITE_NAME=Your Site Name
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server should now be running at http://localhost:3000.

## API Usage

### Chat Completions Endpoint

```
POST /api/chat/completions
```

Request body:
```json
{
  "model": "agentica-org/deepcoder-14b-preview:free",
  "messages": [
    {
      "role": "user",
      "content": "What is the meaning of life?"
    }
  ]
}
```

Example using cURL:
```bash
curl -X POST http://localhost:3000/api/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentica-org/deepcoder-14b-preview:free",
    "messages": [
      {
        "role": "user",
        "content": "What is the meaning of life?"
      }
    ]
  }'
```

### Health Check

```
GET /health
```

Returns a 200 status with a JSON response indicating the server is running.

## Deployment on Render.com

1. Push your code to a Git repository (GitHub, GitLab, etc.).

2. Create a new Web Service on Render.com:
   - Connect your repository
   - Set the build command to `npm install`
   - Set the start command to `npm start`
   - Add the environment variables from your `.env` file

3. Deploy the service.

## Publishing on RapidAPI

1. Create an account on RapidAPI.com.

2. Go to "My APIs" and click "Add API".

3. Fill in the API details:
   - Name: DeepCoder AI API
   - Description: Access DeepCoder AI models through a proxy API
   - Category: Machine Learning/AI

4. Add your Render.com endpoint as the API base URL.

5. Define the endpoints:
   - `/api/chat/completions` (POST)
   - `/health` (GET)

6. Set up pricing plans according to your business model.

7. Test the endpoints and publish your API.

## Security Considerations

- Never commit your `.env` file to version control
- Use HTTPS in production
- Consider adding rate limiting for production use
- Implement API key authentication for your proxy service

## License

ISC#   d e e p s e e k - a p i - c r e a t i o n  
 #   d e e p s e e k - a p i - c r e a t i o n  
 