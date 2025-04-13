/**
 * Example client for DeepCoder API using Node.js
 * 
 * This example shows how to call the DeepCoder API from a Node.js client.
 * It can be easily adapted for browser-based JavaScript.
 */

// Import fetch (for Node.js < 18, you'll need to install node-fetch)
// For Node.js 18+, fetch is built-in
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// API configuration
const API_URL = 'https://deepcoder-api.onrender.com'; // Replace with your actual API URL
const RAPID_API_KEY = 'YOUR_RAPID_API_KEY'; // If using RapidAPI

// Example function to call DeepCoder API directly
async function callDeepCoderAPI(message) {
  try {
    const response = await fetch(`${API_URL}/api/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'agentica-org/deepcoder-14b-preview:free',
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling DeepCoder API:', error);
    throw error;
  }
}

// Example function to call DeepCoder API via RapidAPI
async function callViaRapidAPI(message) {
  try {
    const response = await fetch(`https://deepcoder-ai-api.p.rapidapi.com/api/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'deepcoder-ai-api.p.rapidapi.com'
      },
      body: JSON.stringify({
        model: 'agentica-org/deepcoder-14b-preview:free',
        messages: [
          {
            role: 'user',
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`RapidAPI error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling via RapidAPI:', error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Example calling the API directly
    console.log('Calling API directly...');
    const directResult = await callDeepCoderAPI('What are the three laws of robotics?');
    console.log('Direct API Response:');
    console.log(directResult.choices[0].message.content);
    console.log('\n-------------------\n');

    // Example calling via RapidAPI (uncomment when ready to use)
    /* 
    console.log('Calling via RapidAPI...');
    const rapidApiResult = await callViaRapidAPI('What are the three laws of robotics?');
    console.log('RapidAPI Response:');
    console.log(rapidApiResult.choices[0].message.content);
    */
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the example
main(); 