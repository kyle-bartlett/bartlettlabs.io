export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // YYYY-MM-DD
  readTime: string;
  author: string;
  coverAlt: string;
  content: string; // HTML content
}
