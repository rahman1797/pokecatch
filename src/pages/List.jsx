import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../graphQL/Query";
import { Link } from 'react-router-dom';

import { css, cx } from '@emotion/css'

import pickachu from '../assets/images/pickachu.png'

export default function List() {
  const { loading, error, data } = useQuery(GET_POKEMON);

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    // console.log(data);
    if(loading === false){
      setPokemon( data.pokemon_v2_pokemon );
    }
  }, [loading, data]);

  return (
    <section className='list'>
      <div className='container'>
        <h3 className='text-center'>{`Found ${pokemon.length} pokemons`}</h3>
        <div className='row'>
          
          <hr/>
          {pokemon.map(obj => {
            return (
              <Link className='col-lg-2 col-md-3 col-sm-4 col-4 text-center' to={`/detail/${obj.name}`}>
                  <div className='card card-poke-list p-1 my-1'>
                    <img src={pickachu} className={`mx-auto poke-img`} />
                    <span className={css`
                      margin-top: 50px
                    `}>{obj.name}</span>
                  </div>
              </Link>
            )
            
          })}
        </div>
      </div>
    </section>
  )
}
