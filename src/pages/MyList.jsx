import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { MY_POKEMON } from "../graphQL/Query";
import Swal from "sweetalert2";

import { css } from '@emotion/css'

export default function MyList() {

  // const { loading, error, data } = useQuery(MY_POKEMON, {
  //   variables: { }
  // });

  var My_Pokemon = JSON.parse(localStorage.getItem("my_pokemon") || "[]");

  const [pokemon, setPokemon] = useState(My_Pokemon);
  console.log(pokemon);
  const release_pokemon = (event, name ) => {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You will release " + name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, release it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        let new_data = arrayRemove(My_Pokemon, name);
        localStorage.setItem('my_pokemon', JSON.stringify(new_data));

        setPokemon(JSON.parse(localStorage.getItem("my_pokemon") || "[]"));

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    });

    return false;
  }

  return (
    <section className='mylist'>
    <div className='container pt-3'>
      <h4 className='text-center'>{`You have ${pokemon.length} pokemons`}</h4>
      <div className='row'>

        {pokemon.map(obj => {
          return (
            <div key={obj.id} className='col-lg-2 col-md-3 col-sm-4 col-4 text-center list-layout' to={`/detail/${obj.name}`}>
                <div className='card-poke-list'>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${obj.id}.svg`} className={`mx-auto poke-img`} />
                  <p className={css`
                    margin-top: 2em;
                  `}><strong>{obj.name}</strong></p>
                  <p>
                    Base Exp. {obj.base_experience}
                  </p>
                  <span>Type</span>
                    <div className='mb-3 row'>
                      <div className='container'>
                      {
                        obj.type.map(obj => {
                          return (
                            <div key={obj.name} className='m-1 alert-poke-detail text-center'>
                              {obj.pokemon_v2_type.name}
                            </div>
                          )
                        })
                      }
                      </div>
                    
                    </div>
                  <button className='btn btn-danger-gradient' onClick={(event) => release_pokemon(event, obj.name)}>Relase</button>
                </div>
            </div>
          )
          
        })}
      </div>
    </div>
  </section>
  )
}

function arrayRemove(array, value) { 
    
  const data = array.filter(function(obj){     
      return obj.name != value; 
  });
  return data;
}
