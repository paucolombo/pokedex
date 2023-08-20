import React, { useState } from 'react'

function Search({ onSearch }) {
  const [pokemonChosen, setPokemonChosen] = useState('');
  const handleSearchPokemon = () => {
    onSearch(pokemonChosen);
  }
  return (
    <div className='searchContainer'>
      <h2>Pokemon Name or Number</h2>
      <input type="search" placeholder="Pokemon" id="pokemonSearched"
        name='pokemonSearched' onKeyUp={(e) => setPokemonChosen(e.target.value)} />
      <button onClick={handleSearchPokemon}>Search</button>
    </div>
  )
}

export default Search