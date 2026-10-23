import React, { useState, useEffect, useMemo, useCallback } from "react";
import Header from "./components/Header.jsx";
import StatsBar from "./components/StatsBar.jsx";
import SearchFilterBar from "./components/SearchFilterBar.jsx";
import ArticleTable from "./components/ArticleTable.jsx";
import ArticleForm from "./components/ArticleForm.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import EmptyState from "./components/EmptyState.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import { fetchArticles, addArticle, deleteArticle } from "./services/articleService.js";
import { filterArticles } from "./utils/filterArticles.js";
import { trackEvent } from "./utils/analytics.js";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // true so "No data found" never flashes before the first load
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Load articles on mount
  const loadArticles = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchArticles()
      .then((data) => setArticles(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);


  // Add article handler
  const handleAdd = useCallback(
    async (newArticle) => {
      setLoading(true);
      setError(null);
      try {
        const saved = await addArticle(newArticle);
        setArticles((prev) => [...prev, saved]);
        trackEvent("article_added");
        return true;
      } catch (e) {
        setError(e.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Delete article handler
  const handleDelete = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await deleteArticle(id);
        setArticles((prev) => prev.filter((a) => a.id !== id));
        trackEvent("article_deleted");
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Search term debounced state
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch.trim()) trackEvent("search_performed");
  }, [debouncedSearch]);

  // Derived filtered list
  const filteredArticles = useMemo(() => {
    return filterArticles(articles, debouncedSearch, categoryFilter);
  }, [articles, debouncedSearch, categoryFilter]);

  // Summary stats
  const summary = useMemo(() => {
    const total = articles.length;
    const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
    const top = articles.reduce((best, a) => (a.views > (best?.views ?? 0) ? a : best), null);
    return { total, totalViews, top };
  }, [articles]);

  // Unique categories for filter dropdown
  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.category));
    return Array.from(set);
  }, [articles]);

  // Handlers for UI controls
  const onSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);
  const onCategoryChange = useCallback((e) => {
    setCategoryFilter(e.target.value);
    trackEvent("filter_changed");
  }, []);

  return (
    <div className="container">
      <Header />
      <main>
        <StatsBar summary={summary} />
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          category={categoryFilter}
          onCategoryChange={onCategoryChange}
          categories={categories}
        />
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} onRetry={loadArticles} />}
        {!loading && !error && filteredArticles.length === 0 && (
          <EmptyState message="No articles match your criteria." />
        )}
        {filteredArticles.length > 0 && (
          <ArticleTable articles={filteredArticles} onDelete={handleDelete} />
        )}
        <ArticleForm onAdd={handleAdd} disabled={loading} />
      </main>
    </div>
  );
}

export default App;
