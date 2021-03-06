const fs      = require('fs-extra');
const PATHS   = require('./paths');
const Pokedex = require('../pokedex-api');

module.exports = resolver = {
  getControversy: async ({ pokemonId = 1 }) => {
    const filePath = `${PATHS.CONTROVERSY_DIR}${pokemonId}.json`;
    const fileExists = await fs.pathExists(filePath);

    const defaultResponse = {
      dislikes  : 0,
      id        : pokemonId,
      likes     : 0,
      name      : '',
    };

    try {
      if (fileExists) {
        return await fs.readJSON(filePath);
      }

      const pokemon = await Pokedex.getPokemonByName(pokemonId);

      if (!pokemon) {
        return defaultResponse;
      }

      const name = pokemon.name;

      const data = { ...defaultResponse, ...{ name } };

      await fs.outputJSON(filePath, data);

      return data;

    } catch (error) {
      return defaultResponse;
    }
  },

  like: async ({ pokemonId = 1 }) => {
    const controversy = await resolver.getControversy({ pokemonId });
    const likes = controversy.likes + 1;

    const newControversy = { ...controversy, ...{ likes }};

    const filePath = `${PATHS.CONTROVERSY_DIR}${pokemonId}.json`;
    await fs.outputJSON(filePath, newControversy);

    return newControversy;
  },

  dislike: async ({ pokemonId = 1 }) => {
    const controversy = await resolver.getControversy({ pokemonId });
    const dislikes = controversy.dislikes + 1;

    const newControversy = { ...controversy, ...{ dislikes } };

    const filePath = `${PATHS.CONTROVERSY_DIR}${pokemonId}.json`;
    await fs.outputJSON(filePath, newControversy);

    return newControversy;
  }
}
