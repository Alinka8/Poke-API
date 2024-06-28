document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const pokemonData = document.getElementById("pokemonData");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const pokemonInput = document
      .getElementById("pokemonInput")
      .value.toLowerCase();
    fetchPokemonData(pokemonInput);
  });

  async function fetchPokemonData(nameOrId) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/ditto`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      displayPokemonData(data);
    } catch (error) {
      pokemonData.innerHTML = `<p>${error.message}</p>`;
    }
  }

  function displayPokemonData(pokemon) {
    pokemonData.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <p><strong>Height:</strong> ${pokemon.height}</p>
            <p><strong>Weight:</strong> ${pokemon.weight}</p>
            <p><strong>Types:</strong> ${pokemon.types
              .map((type) => type.type.name)
              .join(", ")}</p>
        `;
  }
});
