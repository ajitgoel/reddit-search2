import Snoowrap from 'snoowrap';
import dotenv from 'dotenv';

dotenv.config();

const reddit = new Snoowrap({
  userAgent: 'MyApp/1.0.0',
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  username: process.env.REDDIT_USERNAME!,
  password: process.env.REDDIT_PASSWORD!
});

async function fetchOpenAIPosts(limit: number = 10) {
  try {
    // Get the latest posts from r/openai
    const posts = await reddit.getSubreddit('openai').getNew({limit});
    
    // Process and print each post
    posts.forEach((post) => {
      console.log(`
Title: ${post.title}
Author: ${post.author.name}
Score: ${post.score}
URL: ${post.url}
Created: ${new Date(post.created_utc * 1000).toLocaleString()}
${'-'.repeat(50)}
      `);
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

// Execute the function
fetchOpenAIPosts(); 