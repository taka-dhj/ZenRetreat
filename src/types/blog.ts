export interface BlogArticle {
  id: string;
  slug: string;
  title: {
    ja: string;
    en: string;
  };
  excerpt: {
    ja: string;
    en: string;
  };
  content: {
    ja: string;
    en: string;
  };
  metaTitle?: {
    ja: string;
    en: string;
  };
  metaDescription?: {
    ja: string;
    en: string;
  };
  featuredImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: string;
}

export interface BlogMetadata {
  id: string;
  slug: string;
  title: {
    ja: string;
    en: string;
  };
  excerpt: {
    ja: string;
    en: string;
  };
  featuredImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: string;
}
