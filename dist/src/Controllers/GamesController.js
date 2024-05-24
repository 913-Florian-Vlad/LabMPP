"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGame = exports.deleteGame = exports.addGame = exports.getGameById = exports.getGames = void 0;
const GamesModel_1 = require("../Data/GamesModel");
const getGames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield GamesModel_1.GamesModel.find({});
        res.json(games);
    }
    catch (err) {
        res.json({ message: err });
    }
});
exports.getGames = getGames;
const getGameById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game_id = req.params.id;
        const gameById = yield GamesModel_1.GamesModel.findById(game_id);
        res.json(gameById);
    }
    catch (err) {
        res.json({ message: err });
    }
});
exports.getGameById = getGameById;
const addGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = new GamesModel_1.GamesModel(req.body);
        const saveGame = yield game.save();
        res.status(201).json(saveGame);
    }
    catch (err) {
        res.json({ message: err });
    }
});
exports.addGame = addGame;
const deleteGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const game = yield GamesModel_1.GamesModel.findByIdAndDelete(parseInt(id));
    if (!game) {
        res.status(404).send('Game not found');
    }
    else {
        res.status(204).send('Game deleted');
    }
});
exports.deleteGame = deleteGame;
const updateGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, genre, release_date, size, developer_id } = req.body;
    try {
        const updatedGame = yield GamesModel_1.GamesModel.findByIdAndUpdate(id, { name, genre, release_date, size, developer_id }, { new: true });
        res.json(updatedGame);
    }
    catch (err) {
        res.status(404).send('Game not found');
    }
});
exports.updateGame = updateGame;
