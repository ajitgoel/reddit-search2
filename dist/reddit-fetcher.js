"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snoowrap_1 = __importDefault(require("snoowrap"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const reddit = new snoowrap_1.default({
    userAgent: 'MyApp/1.0.0',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
});
async function fetchOpenAIPosts(limit = 10) {
    try {
        // Get the latest posts from r/openai
        const posts = await reddit.getSubreddit('openai').getNew({ limit });
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
    }
    catch (error) {
        console.error('Error fetching posts:', error);
    }
}
// Execute the function
fetchOpenAIPosts();
