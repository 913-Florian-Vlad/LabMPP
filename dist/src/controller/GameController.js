"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGameById = exports.getGames = void 0;
const array_1 = __importDefault(require("@/Data/array"));
const getGames = (req, res) => {
    res.json(array_1.default);
};
exports.getGames = getGames;
const getGameById = (req, res) => {
    res.json(array_1.default.find(game => game.getGameId() === req.params.id));
};
exports.getGameById = getGameById;
