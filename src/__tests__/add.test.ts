import app from '../index';
import array from '../Data/array';
import request from 'supertest';

describe('GET /', () => {
  it('responds with JSON containing the array of games', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(array);
  });
});

describe('GET /data/:id', () => {
  it('responds with JSON containing the game with the specified id', async () => {
    const gameId = array[0].getGameId();
    const response = await request(app).get(`/data/${gameId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(array.find(game => game.getGameId() === gameId));
  });
});

describe('GET /edit/:id', () => {
  it('responds with JSON containing the game with the specified id', async () => {
    const gameId = array[0].getGameId();
    const response = await request(app).get(`/edit/${gameId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(array.find(game => game.getGameId() === gameId));
  });
});

describe('PUT /edit/:id', () => {
  it('updates the game with the specified id and responds with the updated game', async () => {
    const gameId = array[0].getGameId();
    const updatedGame = {
      name: 'Updated Game Name',
      release_date: 'March 4, 2024',
      genre: 'Updated Genre',
      size: 22,
    };
    const response = await request(app).put(`/edit/${gameId}`).send(updatedGame);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Game updated successfully');
    expect(response.body.game).toEqual(expect.objectContaining(updatedGame));
  });

  it('returns 404 if game with the specified id is not found', async () => {
    const response = await request(app).put(`/edit/nonexistentid`).send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('All fields are required');
  });
});

describe('POST /add', () => {
  it('adds a new game and responds with the added game', async () => {
    const newGame = {
      name: 'New Game',
      release_date: 'March 4, 2024',
      genre: 'New Genre',
      size: 22,
    };
    const response = await request(app).post('/add').send(newGame);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(newGame));
  });
});

describe('DELETE /delete/:id', () => {
  it('deletes the game with the specified id and responds with success message', async () => {
    const gameId = array[0].getGameId();
    const response = await request(app).delete(`/delete/${gameId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Game deleted successfully');
  });
});
