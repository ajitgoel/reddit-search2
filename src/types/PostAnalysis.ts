export interface PostCategoryAnalysis {
  isSolutionRequest: boolean;
  isPainOrAnger: boolean;
  isAdviceRequest: boolean;
  isMoneyRelated: boolean;
}

export interface RedditPost {
  title: string;
  content: string;
} 