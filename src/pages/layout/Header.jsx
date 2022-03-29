import React from 'react';
import { Link } from 'react-router-dom';
import { css, cx } from '@emotion/css'
import { FaSearchengin } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";

export default function Header() {
  return (
    <header className='header'>
        <div className='row text-center'>
          <div className='mx-auto col-4'>
          
          </div>
          <div className='mx-auto col-4'>
            <Link to={'/list'} className='row'>
              <FaSearchengin className={'col-12 ' + css`
                font-size: 30px
              `} />
              <span className='col-12'>Search</span>
            </Link>
            
          </div>
          <div className='mx-auto col-4'>
            <Link to={'/my-list'} className='row'>
              <MdCatchingPokemon className={'col-12 ' + css`
                font-size: 30px
              `} />
              <span className='col-12'>My Pokemon</span>
            </Link>
          </div>
        </div>
    </header>
  )
}
