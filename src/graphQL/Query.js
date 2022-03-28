import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
query MyQuery {
  pokemon_v2_pokemon(limit: 50, order_by: {id: asc}) {
    name
    id
  }
}
`;

export const GET_DETAIL_POKEMON = gql`
  query MyQuery ($name: String!) {
    pokemon_v2_pokemon(limit: 1, where: {name: {_similar: $name}}) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonmoves {
        pokemon_v2_move {
          accuracy
          name
        }
      }
    }
  }
  `;
  