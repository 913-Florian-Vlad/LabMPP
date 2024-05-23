import { Request, Response } from 'express';
import { GamesModel } from '../Data/GamesModel';
import { DevelopersModel } from '../Data/Developers';

export const getGames = async (req: Request, res: Response) => {
  try {
    const games = await GamesModel.find({});
    res.json(games);
  } catch (err) {
    res.json({ message: err });
  }
};
