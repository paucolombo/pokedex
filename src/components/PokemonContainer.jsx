import React from 'react'
import { Link } from 'react-router-dom'
import Card from './Card';

function PokemonContainer({ pokemonCollection, pokemonSearched, filterSelected }) {
  return (
    <div className='pokemonContainer'>
      {pokemonSearched.length === 0 && pokemonCollection.filter((pokemon) => {
        return filterSelected.every(type =>
          pokemon.types.some(pokemonType => pokemonType.type.name === type))
      })
        .map((pokemon) => (
          <Link key={pokemon.name} to={`/${pokemon.name}`}>
            <Card key={pokemon.id} pokemon={pokemon} />
          </Link>
        ))}
      {pokemonSearched.length != 0 && <Link key={pokemonSearched.name} to={`/${pokemonSearched.name}`}><Card key={pokemonSearched.id} pokemon={pokemonSearched} /></Link>}
    </div >
  )
}

export default PokemonContainer