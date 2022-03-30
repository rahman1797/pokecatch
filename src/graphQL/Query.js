import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
query MyQuery($limit: Int!, $name: String! ) {
  pokemon_v2_pokemon(limit: $limit, order_by: {id: asc}, where: {name: {_iregex: $name}}) {
    name
    id
    base_experience
  }
}
`;

// export const MY_POKEMON = gql`
// query MyQuery ($id: String!) {
//   pokemon_v2_pokemon(where: {id: {_similar: $id}}, order_by: {id: asc}) {
//     name
//     id
//   }
// }
// `;

export const EXTEND_SEARCH_POKEMON = gql`
query MyQuery ($name: String!) {
  pokemon_v2_pokemon(where: {name: {_iregex: $name}}, order_by: {id: asc}) {
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
      base_experience
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
  