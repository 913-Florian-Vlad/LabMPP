"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Games {
    constructor(name, genre, release_date, size, game_id) {
        this.name = name;
        this.genre = genre;
        this.release_date = release_date;
        this.game_id = game_id;
        this.size = size;
    }
    getGameSize() {
        return this.size;
    }
    setGameSize(size) {
        this.size = size;
    }
    getGameName() {
        return this.name;
    }
    getGameGenre() {
        return this.genre;
    }
    getGameReleaseDate() {
        return this.release_date;
    }
    getGameId() {
        return this.game_id;
    }
    setGameName(name) {
        this.name = name;
    }
    setGameGenre(genre) {
        this.genre = genre;
    }
    setGameReleaseDate(release_date) {
        this.release_date = release_date;
    }
    setGameId(game_id) {
        this.game_id = game_id;
    }
}
exports.default = Games;
