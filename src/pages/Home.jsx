import React from 'react'
import { css, cx } from '@emotion/css'

//Images
import Pickachu from '../assets/images/pickachu.png';

export default function Home() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-8'>
                <img src={Pickachu} className={css`
                    width: 100px
                `} />
            </div>
        </div>
    </div>
  )
}
