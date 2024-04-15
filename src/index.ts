import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import Games from './Data/Games';
import { generateNewGame } from './Data/arrayGeneration';
import newArrayRandom from './Data/arrayGeneration';
import { validateGame } from './middleware/server-side-validations';
import WebSocket from 'ws';

const app = express();
const PORT = 5000;
const server = http.createServer(app); // Create HTTP server
const wss = new WebSocket.Server({ server }); // Attach WebSocket to the HTTP server

// Middleware
app.use(cors());
app.use(bodyParser.json());
const array: Games[] = newArrayRandom;

// WebSocket event handling
wss.on('connection', (ws: WebSocket) => {
  // Handle messages from clients
  ws.on('message', (message: string) => {
    console.log('Received message from client:', message);
    const data = JSON.parse(message);
    switch (data.type) {
      case 'delete':
        handleDelete(data.gameId);
        break;
      default:
        console.log('Invalid message type');
    }
  });

  // Handle disconnect
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

const generateNewEntities = () => {
  setInterval(() => {
    const newGame = generateNewGame();
    array.push(newGame);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'initialData',
            data: array.sort((a, b) => {
              return a.getGameSize() > b.getGameSize() ? 1 : -1;
            }),
          })
        );
      }
    });
  }, 5000);
};
generateNewEntities();

// CRUD operations
const handleAdd = (gameData: any) => {
  const { name, genre, release_date, size } = gameData;
  const gameId = array.length + 1;
  const newGame = new Games(name, genre, release_date, size, gameId.toString());
  array.push(newGame);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'updateData', data: array }));
    }
  });
};

const handleEdit = (gameData: any) => {
  const { id, name, release_date, genre, size } = gameData;
  const gameIndex = array.findIndex(game => game.getGameId() === id);
  if (gameIndex !== -1) {
    array[gameIndex].setGameName(name);
    array[gameIndex].setGameReleaseDate(release_date);
    array[gameIndex].setGameGenre(genre);
    array[gameIndex].setGameSize(size);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'updateData', data: array }));
      }
    });
  } else {
    console.log('Game not found');
  }
};

const handleDelete = (gameId: string) => {
  const gameIndex = array.findIndex(game => game.getGameId() === gameId);
  if (gameIndex !== -1) {
    array.splice(gameIndex, 1);
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'updateData', data: array }));
      }
    });
  } else {
    console.log('Game not found');
  }
};
app.get('/data/:id', (req: Request, res: Response) => {
  res.json(array.find(game => game.getGameId() === req.params.id));
});

app.get('/edit/:id', (req: Request, res: Response) => {
  res.json(array.find(game => game.getGameId() === req.params.id));
});

app.put('/edit/:id', validateGame, (req: Request, res: Response) => {
  const gameId = req.params.id;
  const { name, release_date, genre, size } = req.body;
  const gameIndex = array.findIndex(game => game.getGameId() === gameId);
  if (gameIndex !== -1) {
    array[gameIndex].setGameName(name);
    array[gameIndex].setGameReleaseDate(release_date);
    array[gameIndex].setGameGenre(genre);
    array[gameIndex].setGameSize(size);
    res.json({ message: 'Game updated successfully', game: array[gameIndex] });
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'updateData', data: array }));
      }
    });
  } else {
    res.status(404).json({ message: 'Game not found' });
  }
});

app.post('/add', validateGame, (req: Request, res: Response) => {
  const { name, genre, release_date, size } = req.body;
  const gameId = array.length + 1;
  const newGame = new Games(name, genre, release_date, size, gameId.toString());
  array.push(newGame);
  res.status(201).json(newGame);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: 'updateData', data: array }));
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
