import React, { useState } from 'react';
import './styles.css';

function App() {
  const [query, setQuery] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState('');

  const API_KEY = '17fdadc8656e431588bcb80e49b2b899'; // Replace with your actual key

  const handleSearch = async () => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=1&addRecipeInformation=true&apiKey=${API_KEY}`
    );
    const data = await res.json();
    setRecipe(data.results[0] || null);
    setShowInstructions(false);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="app-title">Mountain Mercado</div>
        <button className="review-btn" onClick={() => setShowReview(!showReview)}>Review</button>
      </nav>

      <div className="container">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {recipe ? (
          <div className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-img" />
            <h2>{recipe.title}</h2>
            <p><strong>Dish Type:</strong> {recipe.dishTypes?.[0] || 'Unknown'}</p>

            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              {recipe.extendedIngredients?.map((item, idx) => (
                <li key={idx}>• {item.original}</li>
              ))}
            </ul>

            <button onClick={() => setShowInstructions(!showInstructions)}>
              {showInstructions ? 'Hide Instructions' : 'View Instructions'}
            </button>

            {showInstructions && (
              <ul className="instructions-list">
                {recipe.analyzedInstructions?.[0]?.steps?.map((step, idx) => (
                  <li key={idx}>• {step.step}</li>
                )) || <li>No instructions found.</li>}
              </ul>
            )}

            <a href={recipe.sourceUrl} className="recipe-btn">Recipe</a>
          </div>
        ) : (
          <p>No recipe found for "{query}".</p>
        )}

        <div className="suggestion-box">
          <h3>Have a suggestion?</h3>
          <textarea
            placeholder="Write your suggestion or recipe idea here..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
          <button onClick={() => alert('Suggestion submitted: ' + suggestion)}>Submit</button>
        </div>
      </div>

      {showReview && (
        <div className="review-modal">
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={() => {
            alert('Review submitted: ' + review);
            setShowReview(false);
            setReview('');
          }}>Submit Review</button>
        </div>
      )}
    </div>
  );
}

export default App;
