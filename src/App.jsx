import Logo from './components/Logo'
import Search from './components/Search'
import { useState, useEffect } from 'react'
import './App.css'
import Filters from './components/Filters'
import Loading from './components/Loading'
import { Routes, Route, Link } from 'react-router-dom'
import PokemonContainer from './components/PokemonContainer'
import React, { lazy, Suspense } from 'react';
import Pagination from './components/Pagination'

const PokemonDetail = lazy(() => import('./components/PokemonDetail'))

function App() {
  const [pokemonCollection, setPokemonCollection] = useState([]);
  const [pokemonSearched, setPokemonSearched] = useState([]);
  const [filterSelected, setFilters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limitPokemons, setLimitPokemons] = useState(40);
  const [paginationVisible, setPaginationVisible] = useState(true);

  useEffect(() => {
    setPokemonCollection([]);
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limitPokemons}&offset=${offset}`);
      const data = await response.json();
      const pokemonPromises = data.results.map(async (item) => {
        const response = await fetch(item.url);
        const poke = await response.json();
        return poke;
      });
      const pokemons = await Promise.all(pokemonPromises);
      setPokemonCollection(pokemons);
      setLimit(Math.floor(data.count / 40) + 1);
    };
    fetchData();
  }, [page, limitPokemons]);

  const handleSearch = (pokemonSelected) => {
    if (pokemonSelected != '') {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSelected}`);
          const data = await response.json();
          setPaginationVisible(false);
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
              <Filters onClickFilters={onClickFilters} setPage={setPage} setOffset={setOffset} setLimitPokemons={setLimitPokemons} setPaginationVisible={setPaginationVisible} />
              <PokemonContainer
                pokemonCollection={pokemonCollection}
                pokemonSearched={pokemonSearched}
                filterSelected={filterSelected}
              />
            </>
          }
        />
        <Route path='/:name' element={
          <Suspense fallback={<div><h3>Loading...</h3></div>}>
            <PokemonDetail setPokemonSearched={setPokemonSearched} setPaginationVisible={setPaginationVisible} />
          </Suspense>
        } />
      </Routes>
      {paginationVisible && <Pagination page={page} setPage={setPage} limit={limit} setOffset={setOffset} offset={offset} />
      }</>
  )
}

export default App
