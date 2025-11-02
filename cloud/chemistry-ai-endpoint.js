// Chemistry AI Endpoint for STEM Quest
// This can be deployed as a serverless function or API endpoint

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
  console.warn('⚠️ Gemini API key not configured. Please set GEMINI_API_KEY or VITE_GEMINI_API_KEY environment variable');
}

async function predictChemicalReaction(reactant1, reactant2) {
  const prompt = `As a chemistry expert, predict the reaction between ${reactant1} and ${reactant2}. 
  
  Please provide your response in the following JSON format:
  {
    "product": "Chemical formula of the main product(s)",
    "description": "Brief description of the reaction type and what happens",
    "observation": "What would be observed during this reaction (color changes, gas evolution, heat, etc.)",
    "balanced_equation": "Balanced chemical equation",
    "reaction_type": "Type of reaction (synthesis, decomposition, single replacement, etc.)"
  }
  
  If no reaction occurs, set product to "No Reaction" and explain why.`;

  try {
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
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      
      // Try to parse JSON from the response
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
      }
      
      // Fallback: create structured response from text
      return {
        product: "AI Response",
        description: responseText.substring(0, 200) + "...",
        observation: "Check the full AI response for details",
        balanced_equation: `${reactant1} + ${reactant2} → ?`,
        reaction_type: "AI Analysis"
      };
    }
    
    throw new Error('No valid response from AI');
    
  } catch (error) {
    console.error('Chemistry AI Error:', error);
    return {
      product: "Prediction Error",
      description: "Could not connect to the AI service.",
      observation: "Please check your internet connection and try again.",
      balanced_equation: `${reactant1} + ${reactant2} → ?`,
      reaction_type: "Error"
    };
  }
}

// Express.js endpoint (for deployment)
export async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reactant1, reactant2 } = req.body;

  if (!reactant1 || !reactant2) {
    return res.status(400).json({ error: 'Both reactants are required' });
  }

  try {
    const result = await predictChemicalReaction(reactant1, reactant2);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// For direct usage
export { predictChemicalReaction };