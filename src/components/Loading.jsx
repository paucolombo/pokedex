import React from 'react'

function Loading({ isVisible }) {
  return (
    <>
      {isVisible < 1 &&
        <div className='loadingContainer'>
          <img className="pokedex" src='./pokedex.png' alt="pokedex" />
          <img className="pokeball" src='./pokeball.png' alt='pokeball' />
        </div>}

    </>
  )

}

export default Loading