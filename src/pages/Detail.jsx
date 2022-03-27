import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_DETAIL_POKEMON } from "../graphQL/Query";
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {

    const POKEMON_NAME = useParams();
    // alert(POKEMON_NAME);
    const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
      variables: { name: POKEMON_NAME.name }
    });

    const [pokemon, setPokemon] = useState(null);
  
    useEffect(() => {
      if(loading === false){
        console.log(data.pokemon_v2_pokemon[0].name);
        // console.log(data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes);
        console.log(data.pokemon_v2_pokemon[0]);
        setPokemon(data.pokemon_v2_pokemon[0]);
      }
      // setTimeout(console.log(data), 5000);
    }, [loading, data]);

    const catch_pokemon = () => {
      let number = Math.floor(Math.random() * 101);
      number >= 50 ? alert('Dapat') : alert('Tidak dapat');
    }

  return (
    <>
    <div className='container'>

      {
        pokemon !== null ?
        <div>
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} />
          <h1 className='text-center'>
            { pokemon.name }
          </h1>
          <h3>Types</h3>
          <div className='row'>
          {
            pokemon.pokemon_v2_pokemontypes.map(obj => {

              return (
                <div className='col-md-2 col-4'>
                  {obj.pokemon_v2_type.name}
                </div>
              )
              
            })
          }
          </div>
          <h3>Moves</h3>
          {pokemon.pokemon_v2_pokemonmoves.length}
          <div className='row'>
          {
            pokemon.pokemon_v2_pokemonmoves.map(obj => {

              return (
                <div className='col-md-2 col-4'>
                  { obj.pokemon_v2_move.name } ({obj.pokemon_v2_move.accuracy})
                </div>
              )
              
            })
          }
          </div>
          
        </div>
        :
        ''
      }
    </div>
    <button className='btn btn-info' onClick={catch_pokemon}>Catch</button>
    </>
  )
}
