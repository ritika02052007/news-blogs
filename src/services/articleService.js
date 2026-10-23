// services/articleService.js
// Simulated async service with localStorage persistence and random failures

const STORAGE_KEY = "news-articles";
const FAILURE_RATE = 0.1; // 10% chance to fail
const DELAY_MS = 1500;

function simulateDelay() {
  return new Promise((resolve) => setTimeout(resolve, DELAY_MS));
}

function randomFail() {
  return Math.random() < FAILURE_RATE;
}

function getStored() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

function setStored(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

function seedIfEmpty() {
  if (!getStored()) {
    const seed = [
      {
        id: "1",
        title: "City Council Approves New Park",
        author: "Jane Doe",
        category: "Local",
        views: 1240,
        publishedAt: "2024-09-15",
      },
      {
        id: "2",
        title: "Tech Giants Release Quarterly Earnings",
        author: "John Smith",
        category: "Technology",
        views: 5320,
        publishedAt: "2024-09-14",
      },
      {
        id: "3",
        title: "Health Benefits of Morning Walks",
        author: "Dr. Amy Lee",
        category: "Health",
        views: 980,
        publishedAt: "2024-09-13",
      },
      {
        id: "4",
        title: "Local Sports Team Wins Championship",
        author: "Mike Johnson",
        category: "Sports",
        views: 2150,
        publishedAt: "2024-09-12",
      },
      {
        id: "5",
        title: "Election Results: New Mayor Elected",
        author: "Sarah Patel",
        category: "Politics",
        views: 3780,
        publishedAt: "2024-09-11",
      },
      {
        id: "6",
        title: "Travel Guide: Exploring the Mountains",
        author: "Liam Wong",
        category: "Travel",
        views: 1640,
        publishedAt: "2024-09-10",
      },
      {
        id: "7",
        title: "Economy Forecast for Next Quarter",
        author: "Olivia Brown",
        category: "Economy",
        views: 1120,
        publishedAt: "2024-09-09",
      },
    ];
    setStored(seed);
  }
}

export async function fetchArticles() {
  seedIfEmpty();
  await simulateDelay();
  if (randomFail()) {
    throw new Error("Failed to fetch articles. Please try again.");
  }
  return getStored();
}

export async function addArticle(article) {
  await simulateDelay();
  if (randomFail()) {
    throw new Error("Failed to add article. Please retry.");
  }
  const articles = getStored() || [];
  const newArticle = { ...article, id: Date.now().toString(), publishedAt: new Date().toISOString().split("T")[0] };
  const updated = [...articles, newArticle];
  setStored(updated);
  return newArticle;
}

export async function deleteArticle(id) {
  await simulateDelay();
  if (randomFail()) {
    throw new Error("Failed to delete article. Please retry.");
  }
  const articles = getStored() || [];
  const updated = articles.filter((a) => a.id !== id);
  setStored(updated);
  return true;
}
