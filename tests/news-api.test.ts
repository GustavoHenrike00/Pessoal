import { describe, it, expect, beforeAll } from "vitest";
import axios from "axios";

describe("NewsAPI Integration", () => {
  let apiKey: string;

  beforeAll(() => {
    apiKey = process.env.NEWS_API_KEY || "";
  });

  it("should have NEWS_API_KEY environment variable", () => {
    expect(apiKey).toBeTruthy();
    expect(apiKey.length).toBeGreaterThan(0);
  });

  it("should fetch technology news successfully", async () => {
    if (!apiKey) {
      console.warn("NEWS_API_KEY not set, skipping API test");
      return;
    }

    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: "technology",
          sortBy: "publishedAt",
          language: "en",
          pageSize: 5,
          apiKey: apiKey,
        },
        timeout: 10000,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("articles");
      expect(Array.isArray(response.data.articles)).toBe(true);
      expect(response.data.articles.length).toBeGreaterThan(0);

      // Validate article structure
      const article = response.data.articles[0];
      expect(article).toHaveProperty("title");
      expect(article).toHaveProperty("description");
      expect(article).toHaveProperty("url");
      expect(article).toHaveProperty("publishedAt");
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Invalid NEWS_API_KEY: Unauthorized (401)");
      }
      if (error.response?.status === 429) {
        console.warn("API rate limit reached");
        return;
      }
      throw error;
    }
  });

  it("should fetch economy news successfully", async () => {
    if (!apiKey) {
      console.warn("NEWS_API_KEY not set, skipping API test");
      return;
    }

    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: "economy",
          sortBy: "publishedAt",
          language: "en",
          pageSize: 5,
          apiKey: apiKey,
        },
        timeout: 10000,
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("articles");
      expect(Array.isArray(response.data.articles)).toBe(true);
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Invalid NEWS_API_KEY: Unauthorized (401)");
      }
      if (error.response?.status === 429) {
        console.warn("API rate limit reached");
        return;
      }
      throw error;
    }
  });
});
