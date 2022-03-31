import React, { useState } from 'react';
import Swal from "sweetalert2";
import { css } from '@emotion/css';

export default function MyList() {

  var My_Pokemon = JSON.parse(localStorage.getItem("my_pokemon") || "[]");
  
  //Sort by catch date
  My_Pokemon.sort((a, b) => {
      return b.catch_date - a.catch_date;
  });

  //Save to state
  const [pokemon, setPokemon] = useState(My_Pokemon);

  //Release pokemon by name
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
        
        let new_data = pokeRemove(My_Pokemon, name);
        localStorage.setItem('my_pokemon', JSON.stringify(new_data));

        setPokemon(JSON.parse(localStorage.getItem("my_pokemon") || "[]"));

        Swal.fire(
          'Deleted!',
          'Your pokemon has been released.',
          'success'
        )
      }
    });

    return false;
  }

  //Release all pokemon by clear localStorage
  const release_all = (event ) => {
    event.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "You will release them all",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, release all!'
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.clear();
        setPokemon(JSON.parse(localStorage.getItem("my_pokemon") || "[]"));

        Swal.fire(
          'Deleted!',
          'Your pokemon has been released.',
          'success'
        )
      }
    });

    return false;
  }

  //Search pokemon
  const searchPokemon = (event) => {
    let value = event.target.value;
    
    setPokemon(My_Pokemon.filter((obj) => 
      new RegExp(value, 'i').exec(obj.name)));
  }

  return (
    <section className='mylist' data-testid="show-mylist-page">
    <div className='container pt-3'>
      <h4 className='text-center'>{`You have ${pokemon.length} pokemons`}</h4>
      <div className='row'>
        <div className='col-12'>
          <input className='form-control mx-auto my-2 col-md-6' placeholder='Find pokemon...' onChange={(event) => searchPokemon(event)} />
        </div>
        <div className='col-12 d-flex'>
          {My_Pokemon.length > 0 ? <button className='btn mx-auto my-2 btn-danger-gradient' onClick={(event) => release_all(event)}>Release them all</button> : ''}
        </div>

        {pokemon.map(obj => {
          return (
            <div key={obj.name} className='col-lg-2 col-md-3 col-sm-4 col-4 text-center list-layout' to={`/detail/${obj.name}`}>
                <div className='card-poke-list'>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${obj.id}.svg`} className={`mx-auto poke-img`} alt='' />
                  <p className={css`
                    margin-top: 2em;
                    font-size:1.2em;
                  `}><strong>{obj.name}</strong></p>
                  <p>
                    Base Exp. {obj.base_experience}
                  </p>
                  <strong>Type</strong>
                    <div className='row'>
                      <div className='container pb-3'>
                      {
                        obj.type.map(obj => {
                          return (
                            <div key={obj.pokemon_v2_type.name} className='m-1 p-1 alert-poke-detail text-center'>
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

function pokeRemove(array, value) { 
    
  const data = array.filter(function(obj){     
      return obj.name !== value; 
  });
  return data;
}
