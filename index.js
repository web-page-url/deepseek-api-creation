const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-RapidAPI-Key', 'X-RapidAPI-Host'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Main API endpoint to proxy requests to OpenRouter
app.post('/api/chat/completions', async (req, res) => {
  try {
    // Extract request body or use defaults
    const { model = 'agentica-org/deepcoder-14b-preview:free', messages, ...otherParams } = req.body;
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ 
        error: 'Invalid request: messages array is required' 
      });
    }

    // Configure options to include reasoning
    const options = {
      ...otherParams,
      model,
      messages,
      // Add option to request reasoning if not already specified
      options: {
        ...(otherParams.options || {}),
        // Set to true to include reasoning in the response
        reasoning: true
      }
    };

    console.log('Sending request to OpenRouter with options:', JSON.stringify(options, null, 2));

    // Call OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      options,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.SITE_URL || 'https://deepcoder-api.onrender.com',
          'X-Title': process.env.SITE_NAME || 'DeepCoder API Proxy',
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the response to help with debugging
    console.log('Response from OpenRouter:', 
      JSON.stringify({
        status: response.status,
        choices: response.data.choices?.map(choice => ({
          message: {
            role: choice.message?.role,
            content_length: choice.message?.content?.length || 0,
            has_reasoning: !!choice.message?.reasoning
          }
        }))
      }, null, 2)
    );

    // Forward the response back to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    
    // Return appropriate error response
    res.status(error.response?.status || 500).json({
      error: error.response?.data || 'Internal Server Error',
      message: error.message
    });
  }
});

// Documentation endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'DeepCoder API Proxy',
    description: 'Proxy service for OpenRouter AI models',
    endpoints: {
      '/api/chat/completions': {
        method: 'POST',
        description: 'Generate chat completions using AI models with reasoning',
        body: {
          model: 'Model ID (default: agentica-org/deepcoder-14b-preview:free)',
          messages: 'Array of message objects with role and content',
          options: {
            reasoning: 'Set to true to include reasoning in the response (default: true)'
          }
        }
      },
      '/health': {
        method: 'GET',
        description: 'Health check endpoint'
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 