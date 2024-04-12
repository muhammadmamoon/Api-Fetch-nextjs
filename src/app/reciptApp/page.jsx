"use client"

import { useState } from 'react';
import Head from 'next/head';


import SearchBar from './searchbar';
import RecipeCard from './reciptCard';

export default function Home() {
    const [dishes, setDishes] = useState([]);

    
    const handleSearch = async (searchTerm) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
            const data = await response.json();
            if (data.meals) {
                setDishes(data.meals);
            } else {
                setDishes([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Head>
                <title>Recipe App</title>
            </Head>

            <main className="container mx-auto px-4">
                
            
              <SearchBar onSearch={handleSearch}  />
               
                <div>
                    {dishes.map((dish) => (
                        <RecipeCard key={dish.idMeal} dish={dish} />
                    ))}
                </div>
            </main>
        </div>
    );
}
