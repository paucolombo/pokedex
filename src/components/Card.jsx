import React from 'react'

const Card = ({ pokemon }) => {
  return (
    <div className='pokemonCard'>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      <span>Number: {pokemon.id}</span>
      <span>Type: {pokemon.types.map((type) => type.type.name + " ")}</span>
    </div>
  )
}

export default Card