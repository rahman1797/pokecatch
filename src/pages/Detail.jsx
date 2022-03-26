import React from 'react'
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {

    const POKEMON_NAME = useParams();

  return (
    <div>{POKEMON_NAME.name}</div>
  )
}
