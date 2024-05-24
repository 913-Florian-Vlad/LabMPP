"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Games {
    constructor(name, genre, release_date, size, game_id, developer_id) {
        this.name = name;
        this.genre = genre;
        this.release_date = release_date;
        this._id = game_id;
        this.size = size;
        this.developer_id = developer_id;
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
        return this._id;
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
        this._id = game_id;
    }
    toJSON() {
        return {
            name: this.name,
            genre: this.genre,
            release_date: this.release_date,
            _id: this._id,
            size: this.size,
            developer_id: this.developer_id,
        };
    }
}
exports.default = Games;
