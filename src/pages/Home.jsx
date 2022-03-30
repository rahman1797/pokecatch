import React from 'react'
import { Link } from 'react-router-dom';

//Images
import pokemon from '../assets/images/pokemon.png';
import pokeball from '../assets/images/pokeball1.png';

export default function Home() {
  return (
    <section className='home' data-testid='show-home-page'>
      <div className='container'>
          <div className='row'>
            <div className='col-12 d-flex'>
              <img src={pokemon} width='250' className='mt-5 mx-auto' alt='' />
            </div>
            <img src={pokeball} className='my-5 pokeball mx-auto' alt='' />
          </div>
          <div className='row'>
            <Link className='mt-5 btn btn-lg btn-home-gradient mx-auto' to={'/list'}>Let's Catch em all</Link>
          </div>
      </div>
    </section>
  )
}
