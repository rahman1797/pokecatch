import React from 'react'
import { Link } from 'react-router-dom';

//Images
import pokemon from '../assets/images/pokemon.png';
import pokeball from '../assets/images/pokeball1.png';

export default function Home() {
  return (
    <section className='home'>
      <div className='container'>
          <div className='row'>
            <img src={pokemon} className='mt-5 mx-auto' />
            <img src={pokeball} className='my-5 pokeball mx-auto' />
          </div>
          <div className='row'>
            <Link className='mt-5 btn btn-lg btn-home-gradient mx-auto' to={'/list'}>Let's Catch em all</Link>
          </div>
      </div>
    </section>
  )
}
