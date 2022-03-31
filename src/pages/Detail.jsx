import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { GET_DETAIL_POKEMON } from "../graphQL/Query";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Swal from "sweetalert2";
import { css } from '@emotion/css'
import pokeball from '../assets/images/pokeball1.png';

export default function Detail() {

  let navigate = useNavigate();
  const POKEMON_NAME = useParams(); //Get parameter "name"

  //Get data from API with filtering
  const { loading, error, data } = useQuery(GET_DETAIL_POKEMON, {
    variables: { name: POKEMON_NAME.name }
  });

  //Init state
  const [pokemon, setPokemon] = useState(null);
  const [catch_loading_animation, setCatch_loading_animation] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(loading);
  
  //Get data from browser local storage
  var My_Pokemon = JSON.parse(localStorage.getItem("my_pokemon") || "[]");

  useEffect(() => {
    if(loading === false){
      setPokemon(data.pokemon_v2_pokemon[0]);
      setLoadingFetch(false);
    }
  }, [loading, data]);

  const catch_pokemon = () => {
    let number = Math.floor(Math.random() * 101); //Random number from 0 - 100
    if(number >= 50){

      //Show loading animation (1 sec)
      setCatch_loading_animation(true);

      setTimeout(() => {

        //Hide loading animation
        setCatch_loading_animation(false);

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
            
            //Save to localStorage if name not duplicate
            //If name duplicate
            if(pokeFind(My_Pokemon, poke_name).length > 0) {
              Swal.showValidationMessage(
                `Name has been exist`
              );
              return false;
            }
            //If give name was empty string
            else if(poke_name.length === 0 || poke_name === "") {
              Swal.showValidationMessage(
                `Enter your pokemon name first`
              );
              return false;
            }
  
            //collect the data
            let data = {
              catch_date: new Date().getTime(),
              id: pokemon.id,
              name: poke_name,
              base_experience: pokemon.base_experience,
              type: pokemon.pokemon_v2_pokemontypes,
              move: pokemon.pokemon_v2_pokemonmoves
            };
  
            //add to array
            My_Pokemon.push(data);
  
            localStorage.setItem('my_pokemon', JSON.stringify(My_Pokemon));
  
            return true;
          },
        }).then((res) => {
          if(res.isConfirmed){
            Swal.fire(
              'Saved!', 'Your pokemon has been collected.', 'success'
            )
          }
          return navigate(`/list`);
        });
      }, 1000);

      
    } else {

      //Show loading animation
      setCatch_loading_animation(true);

      setTimeout(() => {

        //Hide loading animation
        setCatch_loading_animation(false);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'They run away, try again next time!'
        });
      }, 1000);
      
    }
  }
 
  return (
    <>
      <div className={`overlay ${catch_loading_animation ? '' : 'd-none'}`}>
        <img src={pokeball} className='my-5 pokeball m-auto' alt='' />
      </div>
    <section className='detail' data-testid='show-detail-page'>
      
      <div className='container d-flex'>
        {
          // pokemon !== null ?
          <div className='card mx-auto card-poke-detail col-lg-6 col-md-10 col-12'>
            {
              pokemon !== null ?
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} className='detail-img' alt='' />
              :
              <div className={css `
                width: 150px;
                margin-top: -100px;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 20px;
              `}>
                <Skeleton circle height={150} width={150} />
              </div>
            }
            <h1 className='text-center'>
              { pokemon !== null ? pokemon.name : <Skeleton count={1} /> }
              
            </h1>
            <p className='text-center'>
            { pokemon !== null ? 'Base Exp. ' + pokemon.base_experience : <Skeleton count={1} /> }
            </p>
            <h5 className='mt-3'>Types</h5>
            <div className='container row'>
            {
              pokemon !== null ?
              pokemon.pokemon_v2_pokemontypes.map(obj => {
                return (
                  <div key={obj.pokemon_v2_type.name} className='alert-poke-detail text-center mx-1'>
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
                    <div key={index} className='alert-poke-detail text-center m-1'>
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
            
            {
              pokemon !== null ? <button className='btn btn-info-gradient' onClick={catch_pokemon}>Catch now !</button> : <Skeleton />
            }
            
          </div>
        }
      </div>
    </section>
    </>
  )
}

//Find duplicate name
function pokeFind(array, value) {    
  const data = array.filter(function(obj){     
      return obj.name === value; 
  });
  return data;
}

