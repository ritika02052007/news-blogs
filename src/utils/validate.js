// utils/validate.js
// Returns an object with field errors. Empty object means valid.
export function validateArticle({ title, author, category, views }) {
  const errors = {};

  if (!title || title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters.";
  }
  if (!author || author.trim().length === 0) {
    errors.author = "Author is required.";
  }
  if (!category || category.trim().length === 0) {
    errors.category = "Category is required.";
  }
  if (views === undefined || views === "") {
    errors.views = "Views are required.";
  } else {
    const num = Number(views);
    if (!Number.isInteger(num) || num < 0) {
      errors.views = "Views must be a non‑negative whole number.";
    }
  }

  return errors;
}
