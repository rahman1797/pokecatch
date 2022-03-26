import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_POKEMON } from "../graphQL/Query";
import { Link } from 'react-router-dom';

export default function List() {
  const { loading, error, data } = useQuery(GET_POKEMON);
  // const POKEMON_LIST_QUERY = `query MyQuery {
  //   gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {}}, order_by: {id: asc}) {
  //     name
  //     id
  //   }
  // }`;
  // const POKEMON_LIST_QUERY = gql`query MyQuery {
  //   gen3_species: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {}}, order_by: {id: asc}) {
  //     name
  //     id
  //   }
  // }`;
  

  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    if(loading === false){
      setPokemon( data.gen3_species );
    }
    // setTimeout(console.log(data), 5000);
    

  }, [loading]);

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
