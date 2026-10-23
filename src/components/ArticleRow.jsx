// ArticleRow.jsx - a single article row
import React, { useCallback } from "react";

function ArticleRow({ article, onDelete }) {
  const { id, title, author, category, views, publishedAt } = article;
  const handleDelete = useCallback(() => {
    if (window.confirm("Delete this article?")) onDelete(id);
  }, [id, onDelete]);

  return (
    <tr>
      <td>{title}</td>
      <td>{author}</td>
      <td><span className="badge">{category}</span></td>
      <td className="num">{views.toLocaleString()}</td>
      <td>{new Date(publishedAt).toLocaleDateString()}</td>
      <td>
        <button type="button" className="secondary" onClick={handleDelete} aria-label={`Delete article ${title}`}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default React.memo(ArticleRow);
