// Header.jsx - page header
import React from "react";

function Header() {
  return (
    <header className="app-header">
      <h1>News Blog Performance Optimization</h1>
      <p>Track, search and manage article performance in one place.</p>
    </header>
  );
}

export default React.memo(Header);
