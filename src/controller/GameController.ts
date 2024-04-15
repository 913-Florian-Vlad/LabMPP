import Games from '@/Data/Games';
import array from '@/Data/array';

export const getGames = (req, res) => {
  res.json(array);
};

export const getGameById = (req, res) => {
  res.json(array.find(game => game.getGameId() === req.params.id));
};
