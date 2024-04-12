"use client"

import { useEffect, useState } from 'react';

const PokemonCard = () => {
    const [pokemon, setPokemon] = useState(null);
    const [habitat, setHabitat] = useState('');
    const [diet, setDiet] = useState('');
    const [pokemonId, setPokemonId] = useState(1); 

    
    const fetchData = async () => {
        try {
            
            const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemonData = await pokemonResponse.json();
            setPokemon(pokemonData);

           
            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
            const speciesData = await speciesResponse.json();

            if (speciesData.habitat) {
                setHabitat(speciesData.habitat.name);
            } else {
                setHabitat('Unknown');
            }

            
            const typeToDietMapping = {
                grass: 'Plants',
                fire: 'Meat',
                water: 'Fish',
                electric: 'Energy',
              
            };

            
            if (pokemonData.types.length > 0) {
                const primaryType = pokemonData.types[0].type.name;
                setDiet(typeToDietMapping[primaryType] || 'Unknown');
            } else {
                setDiet('Unknown');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

   
    useEffect(() => {
        fetchData();
    }, [pokemonId]);

   
    const handleGenerateClick = () => {
        
        setPokemonId((prevId) => prevId + 1);
    };

 
    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-5 p-5">
            {pokemon ? (
                <div className="text-center">
                    
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-64 h-64 mx-auto" />
                    
                  
                    <h2 className="text-2xl font-bold my-3">{pokemon.name.toUpperCase()}</h2>
                    
                    
                    <div className="flex justify-between px-4 py-2">
                        <span>Habitat: {habitat}</span>
                        <span>Diet: {diet}</span>
                    </div>
                    
                    
                    <div className="flex justify-between px-4 py-2">
                        <span>Attack: {pokemon.stats[1].base_stat}</span>
                        <span>Defense: {pokemon.stats[2].base_stat}</span>
                        <span>Speed: {pokemon.stats[5].base_stat}</span>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            
            <button
                onClick={handleGenerateClick}
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition  ml-[120px]"
            >
                Generate
            </button>
        </div>
    );
};

export default PokemonCard;
