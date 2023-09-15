import Logo from './components/Logo'
import Search from './components/Search'
import { useState, useEffect } from 'react'
import './App.css'
import Filters from './components/Filters'
import Loading from './components/Loading'
import { Routes, Route, Link } from 'react-router-dom'
import PokemonContainer from './components/PokemonContainer'
import React, { lazy, Suspense } from 'react';

const PokemonDetail = lazy(() => import('./components/PokemonDetail'))

function App() {
  const [pokemonCollection, setPokemonCollection] = useState([]);
  const [pokemonSearched, setPokemonSearched] = useState([]);
  const [filterSelected, setFilters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1010');
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
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Search onSearch={handleSearch} />
              <Filters onClickFilters={onClickFilters} />
              <PokemonContainer
                pokemonCollection={pokemonCollection}
                pokemonSearched={pokemonSearched}
                filterSelected={filterSelected}
              />
            </>
          }
        />
        <Route path='/:name' element={
          <Suspense fallback={<div><img className="pokeball" src='./pokeball.png' alt='pokeball' /></div>}>
            <PokemonDetail setPokemonSearched={setPokemonSearched} />
          </Suspense>
        } />
      </Routes>
    </>
  )
}

export default App
