// utils/filterArticles.js
// Returns a new array of articles based on search term (title or author) and optional category filter.
export function filterArticles(articles, searchTerm, category) {
  const term = searchTerm.trim().toLowerCase();
  return articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(term) || a.author.toLowerCase().includes(term);
    const matchesCategory = category ? a.category === category : true;
    return matchesSearch && matchesCategory;
  });
}
