import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecipeCard = ({ searchTerm }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = '17fdadc8656e431588bcb80e49b2b899'; // Replace this

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const searchRes = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=1&apiKey=${apiKey}`
        );

        if (searchRes.data.results.length > 0) {
          const recipeId = searchRes.data.results[0].id;
          const detailsRes = await axios.get(
            `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`
          );
          setRecipe(detailsRes.data);
        } else {
          setRecipe(null);
        }
      } catch (error) {
        console.error('Spoonacular API error:', error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [searchTerm]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>No recipe found for "{searchTerm}".</p>;

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-img" />
      <div className="recipe-title-box">
        <h2>{recipe.title}</h2>
        <p>Dish Type: {recipe.dishTypes?.[0] || "N/A"}</p>
      </div>
      <p><strong>Ingredients:</strong></p>
      <ul className="ingredients-list">
        {recipe.extendedIngredients.map((ing, index) => (
          <li key={index}>• {ing.original}</li>
        ))}
      </ul>
      <button className="view-btn" onClick={() => alert(recipe.instructions || "No instructions available")}>
        View Recipe
      </button>
    </div>
  );
};

export default RecipeCard;
