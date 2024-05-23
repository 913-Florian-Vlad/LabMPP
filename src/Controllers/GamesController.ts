/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response } from 'express';
import { GamesModel, IGames } from '../Data/GamesModel';
import { DevelopersModel, IDevelopers } from '../Data/Developers';

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await GamesModel.find({});
    res.json(games);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getGameById = async (req: Request, res: Response) => {
  try {
    const game_id = req.params.id;
    const gameById = await GamesModel.findById(game_id);
    res.json(gameById);
  } catch (err) {
    res.json({ message: err });
  }
};

export const addGame = async (req: Request, res: Response) => {
  try {
    const game = new GamesModel(req.body);
    const saveGame = await game.save();
    res.status(201).json(saveGame);
  } catch (err) {
    res.json({ message: err });
  }
};

export const deleteGame = async (req: Request, res: Response) => {
  const id = req.params.id;
  const game = await GamesModel.findByIdAndDelete(parseInt(id));

  if (!game) {
    res.status(404).send('Game not found');
  } else {
    res.status(204).send('Game deleted');
  }
};

export const updateGame = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, genre, release_date, size, developer_id } = req.body;

  try {
    const updatedGame = await GamesModel.findByIdAndUpdate(
      id,
      { name, genre, release_date, size, developer_id },
      { new: true }
    );
    res.json(updatedGame);
  } catch (err) {
    res.status(404).send('Game not found');
  }
};
