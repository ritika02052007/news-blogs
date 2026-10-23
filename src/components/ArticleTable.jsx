// ArticleTable.jsx - article list as an accessible table
import React from "react";
import ArticleRow from "./ArticleRow.jsx";

function ArticleTable({ articles, onDelete }) {
  return (
    <section className="card" aria-label="Articles">
      <div className="table-wrap">
        <table>
          <caption>Articles ({articles.length})</caption>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col" className="num">Views</th>
              <th scope="col">Published</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <ArticleRow key={article.id} article={article} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default React.memo(ArticleTable);
