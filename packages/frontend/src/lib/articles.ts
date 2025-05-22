import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleListItem } from '@/types/article';
import { articleApi } from './api/article';

const articlesDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getArticles(): Promise<ArticleListItem[]> {
  try {
    // APIから公開済み記事を取得
    const apiArticles = await articleApi.getArticles({ status: 'published' });
    
    if (Array.isArray(apiArticles)) {
      // APIから取得した記事をフォーマット
      const articles = apiArticles.map(article => ({
        slug: article.slug,
        title: article.title,
        description: article.description,
        publishedAt: article.publishedAt,
        thumbnail: article.thumbnail || '/images/default-thumbnail.jpg',
        tags: article.tags || [],
      }));
      
      return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
    
    // APIが配列を返さない場合やエラーの場合は、従来のファイルベースの実装を使用
    const files = fs.readdirSync(articlesDirectory);

    const articles = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const filePath = path.join(articlesDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug: file.replace('.mdx', ''),
          title: data.title,
          description: data.description,
          publishedAt: data.publishedAt,
          thumbnail: data.thumbnail,
          tags: data.tags,
        };
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return articles;
  } catch (error) {
    console.error('記事一覧の取得に失敗しました:', error);
    return [];
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    // APIから記事を取得
    const apiArticle = await articleApi.getArticleBySlug(slug);
    
    if (apiArticle) {
      return {
        slug,
        frontmatter: {
          title: apiArticle.title,
          description: apiArticle.description,
          publishedAt: apiArticle.publishedAt,
          thumbnail: apiArticle.thumbnail || '/images/default-thumbnail.jpg',
          tags: apiArticle.tags || [],
        },
        content: apiArticle.content,
      };
    }
    
    // APIから記事が取得できない場合は、ファイルベースで取得を試みる
    const filePath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // MDXコンテンツの処理
    // 1. 改行を保持しながら処理
    // 2. 見出しの前後に適切な空行を追加
    // 3. 連続する改行を適切に制御
    const processedContent = content
      .split('\n')
      .map(line => {
        // 見出しの行の場合、前に空行を追加
        if (line.trim().startsWith('#')) {
          return `\n${line.trimEnd()}`;
        }
        return line.trimEnd();
      })
      .join('\n')
      // 3行以上の連続した改行を2行に制限（ただし、見出しの前は保持）
      .replace(/(?<!#.*)\n{3,}/g, '\n\n');

    return {
      slug,
      frontmatter: {
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt,
        thumbnail: data.thumbnail,
        tags: data.tags,
      },
      content: processedContent,
    };
  } catch (error) {
    console.error(`記事の取得に失敗しました (${slug}):`, error);
    return null;
  }
} 