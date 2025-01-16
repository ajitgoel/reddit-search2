### prompt 1
I'm building a Reddit analytics platform via next.js, what is the best package to use for fetching reddit data?

### prompt 2
Help me write a quick typescript script to fetch latest posts from a sub reddit 'openai' using Snoowrap, and I want to auth using username & password

### prompt 3
Help me write a simple typescript to using google flash 2.0 to categorise a reddit posts, it should have output 'PostCategoryAnalysis', where it has boolean (true/false) value for each category below:
1. "Solution requests": Posts where people are seeking solutions for problems
2. "Pain & anger": Posts where people are expressing pains or anger
3. "Advice requests": Posts where people are seeking advice
4. "Money talk": Posts where people are talking about spending money

```
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { z } from 'zod';
const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
});
const model = new ChatGoogleGenerativeAI({ model: 'gemini-1.5-flash' });
const modelWithStructure = model.withStructuredOutput(productSchema);
const prompt = `
Please provide information about a popular tech gadget. 
Output the information in the following JSON format:
{
  "name": "<product name>",
  "price": <price in dollars>,
  "description": "<brief product description>"
}
`;
const structuredOutput = await modelWithStructure.invoke(prompt);
console.log(structuredOutput);
```