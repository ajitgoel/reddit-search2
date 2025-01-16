import dotenv from 'dotenv';
// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

import { PostAnalyzer } from './services/PostAnalyzer';
import { RedditPost } from './types/PostAnalysis';

async function analyzeRedditPost() {
  // Replace with your Google PaLM API key
  const apiKey = process.env.GOOGLE_FLASH_API_KEY;
  if (!apiKey) {
    throw new Error("API key is not defined. Please set GOOGLE_FLASH_API_KEY in your environment.");
}
  const analyzer = new PostAnalyzer(apiKey);

  const post: RedditPost = {
    title: "I can't figure out how to fix my laptop screen!",
    content: "I'm so frustrated! My laptop screen keeps flickering and I've already spent $200 on repairs. Can someone help me figure out what's wrong?"
  };

  try {
    const analysis = await analyzer.analyzePost(post);
    console.log('Post Analysis:', analysis);
  } catch (error) {
    console.error('Error analyzing post:', error);
  }
}

analyzeRedditPost(); 