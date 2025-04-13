const axios = require('axios');

async function testAPI() {
  try {
    console.log('Testing the DeepCoder API...');
    
    const response = await axios.post('http://localhost:3000/api/chat/completions', {
      model: 'agentica-org/deepcoder-14b-preview:free',
      messages: [
        {
          role: 'user',
          content: 'What is the meaning of life?'
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Response received:');
    console.log(JSON.stringify(response.data, null, 2));
    
    // Check if the response has the expected structure
    if (response.data.choices && response.data.choices.length > 0) {
      console.log('\nAPI test successful! Response contains expected data.\n');
      console.log('Generated content:');
      console.log(response.data.choices[0].message.content);
    } else {
      console.log('\nAPI response does not have the expected structure.');
    }

  } catch (error) {
    console.error('Error testing API:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
  }
}

testAPI(); 