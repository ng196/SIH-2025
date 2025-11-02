// Gemini API JavaScript implementation
// IMPORTANT: API Key should be stored in environment variables
// Create a .env file with: VITE_GEMINI_API_KEY=your_actual_api_key
const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
  console.warn('⚠️ Gemini API key not configured. Please set VITE_GEMINI_API_KEY in your .env file');
}

async function callGeminiAPI(prompt) {
  if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }
  
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });

  const data = await response.json();
  return data;
}

// Example usage
// callGeminiAPI("Explain how AI works in a few words")
//   .then(result => console.log(result))
//   .catch(error => console.error('Error:', error));

export { callGeminiAPI };