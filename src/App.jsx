import Logo from './components/Logo'
import Card from './components/Card'
import Search from './components/Search'
import { useState, useEffect } from 'react'
import './App.css'
import Filters from './components/Filters'
import Loading from './components/Loading'

function App() {
  const [pokemonCollection, setPokemonCollection] = useState([]);
  const [pokemonSearched, setPokemonSearched] = useState([]);
  const [filterSelected, setFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1001');
      const data = await response.json();
      const pokemonPromises = data.results.map(async (item) => {
        const response = await fetch(item.url);
        const poke = await response.json();
        return poke;
      });
      const pokemons = await Promise.all(pokemonPromises);
      setPokemonCollection(pokemons);
    };
    fetchData();
  }, []);

  const handleSearch = (pokemonSelected) => {
    if (pokemonSelected != '') {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSelected}`);
          const data = await response.json();
          setPokemonSearched(data);
        } catch (err) {
          alert("No hay pokemons que coincidan con su busqueda")
        }
      }

      fetchData();
    }
  }

  const onClickFilters = (filterSelected) => {
    setPokemonSearched('');
    setFilters(filterSelected);
  }

  return (
    <>
      <Loading isVisible={pokemonCollection.length} />
      <Logo />
      <Search onSearch={handleSearch} />
      <Filters onClickFilters={onClickFilters} />
      <div className='pokemonContainer'>
        {pokemonSearched.length === 0 && pokemonCollection.filter((pokemon) => {
          return filterSelected.every(type =>
            pokemon.types.some(pokemonType => pokemonType.type.name === type))
        })
          .map((pokemon) =>
            <Card key={pokemon.id} pokemon={pokemon} />
          )
        }
        {pokemonSearched.length != 0 && <Card key={pokemonSearched.id} pokemon={pokemonSearched} />}
      </div>
    </>
  )
}

export default App
