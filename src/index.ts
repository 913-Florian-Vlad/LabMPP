/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express';
import http from 'http';
import { generateNewGame, generateNewDeveloper , boom } from './Data/arrayGeneration';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { GamesModel } from './Data/GamesModel';
import { DevelopersModel } from './Data/Developers';
import { UserModel } from './Data/UserModel';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());

app.use(express.json());
const PORT = 5000;
const server = http.createServer(app);
const io = new Server(server);

// MongoDB Connection
const uri =
  'mongodb+srv://vladfl1234567890:G16ocn5Hv3AA0Q4m@backenddb.e0b84uj.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB';

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });

// WebSocket event handling
io.on('connection', async socket => {
  try {
    console.log('A client connected.');
    const initialData = await GamesModel.find({});
    socket.emit('initialData', initialData);
  } catch (err) {
    console.error(err);
  }
  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A client disconnected.');
  });
});



// Get All Games
app.get('/games', async (req: Request, res: Response) => {
  try {
    const games = await GamesModel.find({});
    res.json(games);
  } catch (err) {
    console.error(err);
  }
});

//Get Game by ID
app.get('/games/:id', async (req: Request, res: Response) => {
  try {
    const game = await GamesModel.findOne({id:req.params.id});
    res.json(game);
  } catch (err) {
    console.error(err);
  }
});

//Create Game
app.post('/games', async (req: Request, res: Response) => {
  try {
    const newGame = new GamesModel(req.body);
    const savedGame = await newGame.save();
    res.json(savedGame);
  } catch (err) {
    console.error(err);
  }
});

//Update Game
app.put('/edit/:id', async (req: Request, res: Response) => {
  try {
    const updatedGame = await GamesModel.updateOne({id:parseInt(req.params.id)},req.body);
    res.json(updatedGame);
  } catch (err) {
    console.error(err);
  }
});

//Delete Game
app.delete('/games/:id', async (req: Request, res: Response) => {
  try {
    await GamesModel.findOneAndDelete({id:req.params.id});
    res.json({ message: 'Game deleted' });
  } catch (err) {
    console.error(err);
  }
});

//Get All Developers
app.get('/developers', async (req: Request, res: Response) => {
  try {
    const developers = await DevelopersModel.find({});
    res.json(developers);
  } catch (err) {
    console.error(err);
  }
});

//Get 20 Developers
app.get('/developers/20', async (req: Request, res: Response) => {
  try {
    const developers = await DevelopersModel.find({}).limit(20);
    res.json(developers);
  } catch (err) {
    console.error(err);
  }
});

//Add Developer
app.post('/developers', async (req: Request, res: Response) => {
  try {
    const newDeveloper = new DevelopersModel(req.body);
    const savedDeveloper = await newDeveloper.save();
    res.json(savedDeveloper);
  } catch (err) {
    console.error(err);
  }
});
//Update Developer
app.put('/developers/:id', async (req: Request, res: Response) => {
  try {
    const updatedDeveloper = await DevelopersModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDeveloper);
  } catch (err) {
    console.error(err);
  }
});

//Delete Developer
app.delete('/developers/:id', async (req: Request, res: Response) => {
  try {
    await DevelopersModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Developer deleted' });
  } catch (err) {
    console.error(err);
  }
});

//Get games by developer name
app.get('/developers/:name/games', async (req: Request, res: Response) => {
  try {
    const developer = await DevelopersModel.findOne({name:req.params.name});
    const games = await GamesModel.find({developer_id:developer?.developer_id});
    res.json(games);
  } catch (err) {
    console.error(err);
  }
});

//Aggregation for how many games each developer has
app.get('/developers/games', async (req: Request, res: Response) => {
  try {
    const games = await GamesModel.aggregate([
      {
        $group: {
          _id: '$developer_id',
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(games);
  } catch (err) {
    console.error(err);
  }
});

app.get('/users',async (req:Request , res:Response) =>
{
  try{
  const users = await UserModel.find({});
  res.json(users);
  }catch(err)
  {
    console.error(err);
  }
}
)

app.post('/register',async (req:Request , res:Response) =>
{
  try{
    const checkUser = await UserModel.findOne({name:req.body.name});
    if(checkUser?.name != null)
    {
      res.json({message:"User already exists"});
    }else{
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.json(savedUser);
    }
  }catch(err)
  {
    console.error(err);
  }
}
)

app.post('/login',async (req:Request , res:Response) =>
{
  try{
    const {name , password} = req.body;
    const user = await UserModel.findOne({name:req.body.name});
    if(user?.password === req.body.password)
    {
      const token = jwt.sign({ name }, 'key', { expiresIn: '15m' });
      res.json({message:"Login successful", token});
    }
    else{
      res.json({message:"Login failed"});
    }
  }catch(err)
  {
    console.error(err);
  }
});

//get user by username 
app.get('/users/:username',async (req:Request , res:Response) =>
{
  try{
    const user = await UserModel.findOne({name:req.params.name});
    res.json(user);
  }catch(err)
  {
    console.error(err);
  }
}
)
//get developer id by name
app.get('/developers/:name',async (req:Request , res:Response) =>
{
  try{
    const developer = await DevelopersModel.findOne({name:req.params.name});
    res.json(developer);
  }catch(err)
  {
    console.error(err);
  }
}
)
export default app;
