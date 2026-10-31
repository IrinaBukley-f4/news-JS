export interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
}

export interface NewsSource {
    id: string | null;
    name: string;
}
