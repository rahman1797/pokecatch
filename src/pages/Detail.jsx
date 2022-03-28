import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_DETAIL_POKEMON } from "../graphQL/Query";
import { useParams, useNavigate } from "react-router-dom";

import pickachu from '../assets/images/pickachu.png'
import Swal from "sweetalert2";

export default function Detail() {

  const POKEMON_NAME = useParams();
  // alert(POKEMON_NAME);
  const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
    variables: { name: POKEMON_NAME.name }
  });

  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    if(loading === false){
      // console.log(data.pokemon_v2_pokemon[0].name);
      // console.log(data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes);
      // console.log(data.pokemon_v2_pokemon[0]);
      setPokemon(data.pokemon_v2_pokemon[0]);
    }
    // setTimeout(console.log(data), 5000);
  }, [loading, data]);

  const catch_pokemon = () => {
    let number = Math.floor(Math.random() * 101);
    if(number >= 50){
      Swal.fire({
        icon: 'success',
        title: 'Yeay you got them',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Give name',
        showLoaderOnConfirm: true,
        preConfirm: (poke_name) => {
          console.log(poke_name);

          
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You havent get!'
      });
    }
  }
 
  return (
    <section className='detail'>
      <div className='container d-flex'>
        {
          pokemon !== null ?
          <div className='card card-poke-detail'>
            <img src={pickachu} className='detail-img' />
            <h1 className='text-center'>
              { pokemon.name }
            </h1>
            <h5 className='mt-3'>Types</h5>
            <div className='container row'>
            {
              pokemon.pokemon_v2_pokemontypes.map(obj => {

                return (
                  <div key={obj.name} className='alert-poke-detail text-center mx-1'>
                    {obj.pokemon_v2_type.name}
                  </div>
                )
                
              })
            }
            </div>
            <h5 className='mt-3'>Moves</h5>
            <div className='container row'>
            {
              pokemon.pokemon_v2_pokemonmoves.map((obj, index) => {
                if(index < 6) {
                  return (
                    <div key={obj.name} className='alert-poke-detail text-center m-1'>
                      { obj.pokemon_v2_move.name }
                    </div>
                  )
                }
                
                
              })
            }
            
            </div>
            <span className='text-center'>{ pokemon.pokemon_v2_pokemonmoves.length > 6 ? `and ${ pokemon.pokemon_v2_pokemonmoves.length - 6 } more` : '' }</span>

            <button className='btn btn-info-gradient' onClick={catch_pokemon}>Catch now !</button>
            
          </div>
          :
          ''
        }
      </div>
    </section>
  )
}
