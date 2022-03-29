import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { MY_POKEMON } from "../graphQL/Query";
import { Link } from 'react-router-dom';

import { css } from '@emotion/css'

export default function MyList() {

  const { loading, error, data } = useQuery(MY_POKEMON, {
    variables: { id: POKEMON_NAME.name }
  });

  var My_Pokemon = JSON.parse(localStorage.getItem("my_pokemon") || "[]");

  const [pokemon, setPokemon] = useState(My_Pokemon);

  useEffect(() => {

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
            <Link className='col-lg-2 col-md-3 col-sm-4 col-4 text-center list-layout' to={`/detail/${obj.name}`}>
                <div className='card-poke-list'>
                  
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${obj.id}.svg`} className={`mx-auto poke-img`} />
                  <p className={css`
                    margin-top: 30px;
                  `}>{obj.name}</p>
                </div>
            </Link>
          )
          
        })}
      </div>
    </div>
  </section>
  )
}
