import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_DETAIL_POKEMON } from "../graphQL/Query";
import { useParams, useNavigate } from "react-router-dom";

import { css, cx } from '@emotion/css'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import pickachu from '../assets/images/pickachu.png'
import Swal from "sweetalert2";

export default function Detail() {

  const POKEMON_NAME = useParams();
  // alert(POKEMON_NAME);
  const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
    variables: { name: POKEMON_NAME.name }
  });

  const [pokemon, setPokemon] = useState(null);
  
  console.log(My_Pokemon);
  useEffect(() => {
    if(loading === false){
      setTimeout(() => {
        setPokemon(data.pokemon_v2_pokemon[0]);
      }, 0);
      
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

          let data = {
            id: pokemon.id,
            name: poke_name
          };

          My_Pokemon.push(data);

          localStorage.setItem('my_pokemon', JSON.stringify(My_Pokemon));

          // console.log(data);
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
          
          // pokemon !== null ?
          <div className='card mx-auto card-poke-detail'>
            {
              pokemon !== null ?
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} className='detail-img' />
              :
              <Skeleton circle height={100} width={100} className='mx-auto' />
            }
            <h1 className='text-center'>
              { pokemon !== null ? pokemon.name : <Skeleton count={1} /> }
            </h1>
            <h5 className='mt-3'>Types</h5>
            <div className='container row'>
            {
              pokemon !== null ?
              pokemon.pokemon_v2_pokemontypes.map(obj => {

                return (
                  <div key={obj.name} className='alert-poke-detail text-center mx-1'>
                    {obj.pokemon_v2_type.name}
                  </div>
                )
                
              })
              :
              <Skeleton count={2} width={200} />
            }
            </div>
            <h5 className='mt-3'>Moves</h5>
            <div className='container row'>
            {
              pokemon !== null ?
              pokemon.pokemon_v2_pokemonmoves.map((obj, index) => {
                if(index < 6) {
                  return (
                    <div key={obj.name} className='alert-poke-detail text-center m-1'>
                      { obj.pokemon_v2_move.name }
                    </div>
                  )
                }
                
                
              })
              :
              <Skeleton count={2} width={200} />
            }
            
            </div>
            <span className='text-center my-2'>{ pokemon !== null ? (pokemon.pokemon_v2_pokemonmoves.length > 6 ? `and ${ pokemon.pokemon_v2_pokemonmoves.length - 6 } more` : '') : <Skeleton /> }</span>

            <button className='btn btn-info-gradient' onClick={catch_pokemon}>Catch now !</button>
            
          </div>
          // :
          // <div className={css`
          //   width: 400px;
          //   border-radius: 20px;
          //   height: 60vh;
          //   background-color: white;
          //   padding:20px;
          //   margin-top: 8em;
          //   margin-left: auto;
          //   margin-right: auto;
          // `}><Skeleton count={1} /></div>
        }
      </div>
    </section>
  )
}
