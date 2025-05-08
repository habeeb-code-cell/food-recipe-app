import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import SuggestionBox from './SuggestionBox';
import './styles.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedTerm, setSubmittedTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSubmittedTerm(searchTerm);
    }
  };

  return (
    <div className="app-container">
      <div className="recipe-card">
        <div>
          <input
            type="text"
            placeholder="Search a recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        {submittedTerm && <RecipeCard searchTerm={submittedTerm} />}
        <SuggestionBox />
      </div>
    </div>
  );
}

export default App;
