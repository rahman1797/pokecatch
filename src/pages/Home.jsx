import React from 'react'
import { css, cx } from '@emotion/css'

//Images
import pokeball from '../assets/images/pokeball.png';

export default function Home() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-8'>
                <img src={pokeball} className='pokeball' />
            </div>
        </div>
    </div>
  )
}
