import axios from "axios";

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const NEWS_API_BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY = process.env.NEWS_API_KEY || process.env.EXPO_PUBLIC_NEWS_API_KEY;

export const newsService = {
  /**
   * Busca notícias por categoria
   */
  async searchNews(
    query: string,
    language: string = "en",
    pageSize: number = 10,
    page: number = 1
  ): Promise<NewsResponse> {
    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
        params: {
          q: query,
          sortBy: "publishedAt",
          language,
          pageSize,
          page,
          apiKey: NEWS_API_KEY,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Error fetching news:", error.message);
      throw new Error(`Failed to fetch news: ${error.message}`);
    }
  },

  /**
   * Busca notícias de tecnologia
   */
  async getTechnologyNews(pageSize: number = 10): Promise<NewsResponse> {
    return this.searchNews("technology OR AI OR software OR programming", "en", pageSize);
  },

  /**
   * Busca notícias de economia
   */
  async getEconomyNews(pageSize: number = 10): Promise<NewsResponse> {
    return this.searchNews("economy OR finance OR business OR market", "en", pageSize);
  },

  /**
   * Busca notícias de política
   */
  async getPoliticsNews(pageSize: number = 10): Promise<NewsResponse> {
    return this.searchNews("politics OR government OR election", "en", pageSize);
  },

  /**
   * Busca notícias de empregos
   */
  async getJobsNews(pageSize: number = 10): Promise<NewsResponse> {
    return this.searchNews("jobs OR employment OR career OR hiring", "en", pageSize);
  },

  /**
   * Busca notícias em português (Brasil)
   */
  async getPortugueseNews(query: string, pageSize: number = 10): Promise<NewsResponse> {
    return this.searchNews(query, "pt", pageSize);
  },
};
