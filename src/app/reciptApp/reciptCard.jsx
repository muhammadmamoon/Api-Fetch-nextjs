
import React, { useState } from 'react';

const RecipeCard = ({ dish }) => {
    const [isRecipeVisible, setIsRecipeVisible] = useState(false);


    const handleToggleRecipe = () => {
        setIsRecipeVisible((prev) => !prev);
    };

    return (
        <div className="bg-yellow-200 rounded-lg p-4 shadow-lg my-4">
          
            <img src={dish.strMealThumb} alt={dish.strMeal} className="w-full h-64 object-cover rounded-lg" />

        
            <h2 className="text-2xl font-bold my-3 bg-yellow-400 px-2 py-1 rounded-lg">{dish.strMeal}</h2>

           
            <p className="text-lg bg-yellow-400 px-2 py-1 rounded-lg">{dish.strArea}</p>

           
            <h3 className="font-semibold my-2">Ingredients:</h3>
            <ul>
                {Object.keys(dish)
                    .filter((key) => key.startsWith('strIngredient') && dish[key])
                    .map((key, index) => (
                        <li key={index}>{dish[key]}{dish[`strMeasure${index + 1}`] ? ` - ${dish[`strMeasure${index + 1}`]}` : ''}</li>
                    ))}
            </ul>

            
            <button
                onClick={handleToggleRecipe}
                className="mt-3 bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-lg"
            >
                {isRecipeVisible ? 'Hide Recipe' : 'View Recipe'}
            </button>

            
            {isRecipeVisible && (
                <div className="mt-4">
                    <h3 className="text-xl font-bold mb-2">Recipe Instructions:</h3>
                    <p>{dish.strInstructions}</p>
                </div>
            )}
        </div>
    );
};

export default RecipeCard;
