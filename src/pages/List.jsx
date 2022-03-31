import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_POKEMON} from "../graphQL/Query";
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { css } from '@emotion/css'

export default function List() {

  const [pokemon, setPokemon] = useState([]);
  const [limit, setLimit] = useState(30);
  const [search, setSearch] = useState('')

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: { limit: limit, name: search }
  });

  //Show more
  const more_limit = () => {
    setLimit(limit + 15);
  }

  useEffect(() => {
    if(loading === false){
      setPokemon( data.pokemon_v2_pokemon );
    }
  }, [loading, data, search]);

  const SearchPokemon = (event) => {
    let value = event.target.value;

    setPokemon(data.pokemon_v2_pokemon.filter((obj) => 
    new RegExp(value, 'i').exec(obj.name)));
    
    setSearch(value);
    
  }

  return (
    <section className='list' data-testid='show-list-page'>
      <div className='container pt-3'>
        <h4 className='text-center'>{pokemon.length !== 0 ? `Found ${pokemon.length} pokemons` : <Skeleton count={1} className='bg-light' />}</h4>
        <input className='form-control' placeholder='Find pokemon...' onChange={(event) => SearchPokemon(event)} />
        <div className='row' data-testid='show-all-pokemons'>
          
          {pokemon.map(obj => {
            return (
              <Link key={obj.id} className='col-lg-2 col-md-3 col-sm-4 col-4 text-center list-layout' to={`/detail/${obj.name}`}>
                  <div className='card-poke-list'>
                    
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${obj.id}.svg`} className={`mx-auto poke-img`} alt='' />
                    <p className={css`
                      margin-top: 30px;
                    `}><strong>{obj.name}</strong></p>
                    <p>
                      Base Exp. {obj.base_experience}
                    </p>
                  </div>
              </Link>
            )
          })}
        </div>
        <div className='row'>
          <button className='btn btn-info-gradient text-light mx-auto mt-2' onClick={more_limit}>{loading === false ? 'Show more...' : 'Please wait...'}</button>
        </div>
      </div>
    </section>
  )
}
