import OpenAI from "openai";
import 'dotenv/config';

// IMPORTANT: Token should be stored in environment variables
// Create a .env file with: GITHUB_PAT=your_github_personal_access_token
// const token = process.env["GITHUB_PAT"]
const token = process.env.GITHUB_PAT || process.env.VITE_GITHUB_PAT || "GITHUB_PAT";

if (token === "GITHUB_PAT") {
  console.warn('⚠️ GitHub PAT not configured. Please set GITHUB_PAT or VITE_GITHUB_PAT environment variable');
}

const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-nano";

export async function main() {
  if (token === "GITHUB_PAT") {
    throw new Error('GitHub PAT not configured. Please add GITHUB_PAT to your .env file');
  }

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: "You are a helpful assistant." },
        { role:"user", content: "hey? can you reply?" }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model
    });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

