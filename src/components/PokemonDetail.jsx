import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PokemonDetail = ({ setPokemonSearched }) => {
  const params = useParams();
  const pokemon = params.name;

  const [pokemonSelected, setPokemonSelected] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        setPokemonSelected(data);
        console.log("pokemonSelected", pokemonSelected);
      } catch (err) {
        alert("No hay pokemons que coincidan con su busqueda")
      }
    }
    fetchData();
    setPokemonSearched('');
  }, [pokemon]);

  return (
    <>
      {Object.keys(pokemonSelected).length !== 0 &&
        <div className='pokemonFullCard'>
          <h2>{pokemonSelected.name}</h2>
          <div className='pokemonDetailCard'>
            <div className='containerImgPokemon'>

              <img src={pokemonSelected.sprites.front_default} alt={pokemonSelected.name} />

            </div>
            <div className='containerTextPokemon'>
              <ul>
                <li> <span className='bold'>Number:</span> {pokemonSelected.id}</li>
                <li> <span className='bold'>Type:</span> {pokemonSelected.types.map((type) => type.type.name + " ")}</li>
                <li> <span className='bold'>Height:</span> {pokemonSelected.height}</li>
                <li> <span className='bold'>Weight:</span> {pokemonSelected.weight}</li>
                {pokemonSelected.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    <span className='bold capitalize'>{stat.stat.name}</span>: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div >
        </div>
      }

      <Link to='/'> <button>Back to Pokedex</button>
      </Link>
    </>)
}

export default PokemonDetail