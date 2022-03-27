import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../graphQL/Query";
import { Link } from 'react-router-dom';

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
    <div className='container'>
      <div className='row'>
        <h2>{`Found ${pokemon.length} pokemons`}</h2>
        {pokemon.map(obj => {
          return (
            <Link to={`/detail/${obj.name}`}>
              <div className='card p-2'>{obj.name}</div>
            </Link>
          )
          
        })}
      </div>
    </div>
  )
}
