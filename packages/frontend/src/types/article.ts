export interface Article {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnail: string;
    tags?: string[];
  };
  content: string;
}

export interface ArticleListItem {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  tags?: string[];
} 