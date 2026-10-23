// ArticleForm.jsx - add-article form with validation and XSS sanitization
import React, { useState, useCallback } from "react";
import { sanitize } from "../utils/sanitize.js";
import { validateArticle } from "../utils/validate.js";

const FIELDS = [
  { name: "title", label: "Title", type: "text" },
  { name: "author", label: "Author", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "views", label: "Views", type: "number" },
];
const EMPTY = { title: "", author: "", category: "", views: "" };

function ArticleForm({ onAdd, disabled }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateArticle(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    const saved = await onAdd({
      title: sanitize(values.title.trim()),
      author: sanitize(values.author.trim()),
      category: sanitize(values.category.trim()),
      views: Number(values.views),
    });
    if (saved) setValues(EMPTY); // keep the input if saving failed
  };

  return (
    <section aria-labelledby="add-article-heading" className="card">
      <h2 id="add-article-heading">Add Article</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          {FIELDS.map(({ name, label, type }) => (
            <div key={name}>
              <label htmlFor={`field-${name}`}>{label}</label>
              <input
                id={`field-${name}`}
                name={name}
                type={type}
                min={type === "number" ? "0" : undefined}
                value={values[name]}
                onChange={handleChange}
                disabled={disabled}
                aria-invalid={errors[name] ? "true" : undefined}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
              />
              {errors[name] && (
                <p id={`${name}-error`} className="error-text">{errors[name]}</p>
              )}
            </div>
          ))}
        </div>
        <button type="submit" disabled={disabled}>Add Article</button>
      </form>
    </section>
  );
}

export default React.memo(ArticleForm);
