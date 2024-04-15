"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const array_1 = __importDefault(require("./Data/array"));
const Games_1 = __importDefault(require("./Data/Games"));
const server_side_validations_1 = require("./middleware/server-side-validations");
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.json(array_1.default);
});
app.get("/data/:id", (req, res) => {
    res.json(array_1.default.find((game) => game.getGameId() === req.params.id));
});
app.get("/edit/:id", (req, res) => {
    res.json(array_1.default.find((game) => game.getGameId() === req.params.id));
});
app.put("/edit/:id", server_side_validations_1.validateGame, (req, res) => {
    const gameId = req.params.id;
    const { name, release_date, genre, size } = req.body;
    const gameIndex = array_1.default.findIndex((game) => game.getGameId() === gameId);
    if (gameIndex !== -1) {
        array_1.default[gameIndex].setGameName(name);
        array_1.default[gameIndex].setGameReleaseDate(release_date);
        array_1.default[gameIndex].setGameGenre(genre);
        array_1.default[gameIndex].setGameSize(size);
        res.json({ message: "Game updated successfully", game: array_1.default[gameIndex] });
    }
    else {
        res.status(404).json({ message: "Game not found" });
    }
});
app.post("/add", server_side_validations_1.validateGame, (req, res) => {
    const { name, genre, release_date, size } = req.body;
    const gameId = array_1.default.length + 1;
    const newGame = new Games_1.default(name, genre, release_date, size, gameId.toString());
    array_1.default.push(newGame);
    res.status(201).json(newGame);
});
app.delete("/delete/:id", (req, res) => {
    const gameId = req.params.id;
    array_1.default.splice(parseInt(gameId) - 1, 1);
    res.json({ message: "Game deleted successfully" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
