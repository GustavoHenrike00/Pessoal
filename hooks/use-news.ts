import { useState, useEffect, useCallback } from "react";
import { newsService, type NewsArticle } from "@/lib/news-service";

export type NewsCategory = "technology" | "economy" | "politics" | "jobs";

export interface UseNewsOptions {
  category?: NewsCategory;
  pageSize?: number;
}

export function useNews({ category = "technology", pageSize = 10 }: UseNewsOptions = {}) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let response;

      switch (category) {
        case "technology":
          response = await newsService.getTechnologyNews(pageSize);
          break;
        case "economy":
          response = await newsService.getEconomyNews(pageSize);
          break;
        case "politics":
          response = await newsService.getPoliticsNews(pageSize);
          break;
        case "jobs":
          response = await newsService.getJobsNews(pageSize);
          break;
        default:
          response = await newsService.getTechnologyNews(pageSize);
      }

      if (response.articles) {
        setArticles(response.articles);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch news";
      setError(errorMessage);
      console.error("Error fetching news:", err);
    } finally {
      setIsLoading(false);
    }
  }, [category, pageSize]);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  }, [fetchNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return {
    articles,
    isLoading,
    error,
    refreshing,
    refresh,
    refetch: fetchNews,
  };
}
