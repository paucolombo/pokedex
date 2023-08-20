import React from 'react'
import { pokemonTypes } from './Data'
import { useState } from 'react';
import './Filters.css'

function Filters({ onClickFilters }) {
  const [filtersChecked, setFiltersChecked] = useState([]);
  const filtersInputs = document.querySelectorAll('.inputsFilters');
  const handleFilters = () => {
    setFiltersChecked([]);
    for (let input of filtersInputs) {
      if (input.checked) {
        filtersChecked.push(input.value);
      }
    }
    if (filtersChecked.length > 2) {
      alert("There are no Pokemons with more than two types, please select two or one type.");
    } else {
      onClickFilters(filtersChecked);
    }
  };

  const toogleCheckBox = (e) => {
    const inputLi = document.querySelector(`.${e.target.id}`);
    if (e.target.checked) {
      inputLi.style.filter = "drop-shadow(2px 4px 6px black)";
    } else {
      inputLi.style.filter = "unset";
    }
  }
  const clearFilters = () => {
    const inputLi = document.querySelectorAll('.filterElement');
    inputLi.forEach(li =>
      li.style.filter = "unset")
    setFiltersChecked([]);
    for (let input of filtersInputs) {
      input.checked = false;
    }
    onClickFilters([]);
  }
  return (
    <div className='filterContainer'>
      <h2>Search by Pokemon Type</h2>
      <h5>Remember that Pokemons have a maximum of two types</h5>
      <ul className='filterListContainer'>
        {pokemonTypes.map(type =>
          <li className={`filterElement ${type}`} key={type}><label htmlFor={type}>
            <input type="checkbox" name={type} id={type} value={type} className='inputsFilters' onChange={toogleCheckBox} />
            {type}</label></li>
        )}
      </ul>
      <div className='buttonsFiltersContainer'>
        <button className='filterButton' onClick={handleFilters}>Filter</button>
        <button className='filterButton' onClick={clearFilters}>Clear Filter</button>
      </div>
    </div>
  )
}

export default Filters