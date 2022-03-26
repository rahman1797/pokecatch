import { gql } from "@apollo/client";
export const GET_POKEMON = gql`
query MyQuery {
  gen3_species: pokemon_v2_pokemonspecies(order_by: {name: asc}, where: {}) {
    name
    id
  }
}
`;