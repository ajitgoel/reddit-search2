import { GoogleGenerativeAI } from "@google/generative-ai";
import { PostCategoryAnalysis, RedditPost } from '../types/PostAnalysis';

export class PostAnalyzer {
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async analyzePost(post: RedditPost): Promise<PostCategoryAnalysis> {
    const prompt = this.buildPrompt(post);
    const result = await this.getPalmResponse(prompt);
    return this.parseResponse(result);
  }

  private buildPrompt(post: RedditPost): string {
    return `
      Analyze the following Reddit post and respond with ONLY "true" or "false" for each category, one per line:
      
      Post Title: ${post.title}
      Post Content: ${post.content}
      
      Categories to analyze:
      1. Solution Request: Is the user seeking a solution to a problem?
      2. Pain or Anger: Is the user expressing pain or anger?
      3. Advice Request: Is the user seeking advice?
      4. Money Related: Is the post about spending or money?
      
      Respond with only true/false values, one per line, nothing else.
    `;
  }

  private async getPalmResponse(prompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  private parseResponse(response: string): PostCategoryAnalysis {
    const lines = response.trim().split('\n');
    
    return {
      isSolutionRequest: this.parseBoolean(lines[0]),
      isPainOrAnger: this.parseBoolean(lines[1]),
      isAdviceRequest: this.parseBoolean(lines[2]),
      isMoneyRelated: this.parseBoolean(lines[3])
    };
  }

  private parseBoolean(value: string): boolean {
    return value.toLowerCase().trim() === 'true';
  }
} 