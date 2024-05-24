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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const array_1 = __importDefault(require("../Data/array"));
const supertest_1 = __importDefault(require("supertest"));
describe('GET /', () => {
    it('responds with JSON containing the array of games', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(array_1.default);
    }));
});
describe('GET /data/:id', () => {
    it('responds with JSON containing the game with the specified id', () => __awaiter(void 0, void 0, void 0, function* () {
        const gameId = array_1.default[0].getGameId();
        const response = yield (0, supertest_1.default)(index_1.default).get(`/data/${gameId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(array_1.default.find(game => game.getGameId() === gameId));
    }));
});
describe('GET /edit/:id', () => {
    it('responds with JSON containing the game with the specified id', () => __awaiter(void 0, void 0, void 0, function* () {
        const gameId = array_1.default[0].getGameId();
        const response = yield (0, supertest_1.default)(index_1.default).get(`/edit/${gameId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(array_1.default.find(game => game.getGameId() === gameId));
    }));
});
describe('PUT /edit/:id', () => {
    it('updates the game with the specified id and responds with the updated game', () => __awaiter(void 0, void 0, void 0, function* () {
        const gameId = array_1.default[0].getGameId();
        const updatedGame = {
            name: 'Updated Game Name',
            release_date: 'March 4, 2024',
            genre: 'Updated Genre',
            size: 22,
        };
        const response = yield (0, supertest_1.default)(index_1.default).put(`/edit/${gameId}`).send(updatedGame);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Game updated successfully');
        expect(response.body.game).toEqual(expect.objectContaining(updatedGame));
    }));
    it('returns 404 if game with the specified id is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default).put(`/edit/nonexistentid`).send({});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('All fields are required');
    }));
});
describe('POST /add', () => {
    it('adds a new game and responds with the added game', () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: 'New Game',
            release_date: 'March 4, 2024',
            genre: 'New Genre',
            size: 22,
        };
        const response = yield (0, supertest_1.default)(index_1.default).post('/add').send(newGame);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining(newGame));
    }));
});
describe('DELETE /delete/:id', () => {
    it('deletes the game with the specified id and responds with success message', () => __awaiter(void 0, void 0, void 0, function* () {
        const gameId = array_1.default[0].getGameId();
        const response = yield (0, supertest_1.default)(index_1.default).delete(`/delete/${gameId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Game deleted successfully');
    }));
});
