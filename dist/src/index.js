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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const GamesModel_1 = require("./Data/GamesModel");
const Developers_1 = require("./Data/Developers");
const UserModel_1 = require("./Data/UserModel");
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 5000;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const uri = 'mongodb+srv://vladfl1234567890:G16ocn5Hv3AA0Q4m@backenddb.e0b84uj.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB';
mongoose_1.default
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
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('A client connected.');
        const initialData = yield GamesModel_1.GamesModel.find({});
        socket.emit('initialData', initialData);
    }
    catch (err) {
        console.error(err);
    }
    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
}));
app.get('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield GamesModel_1.GamesModel.find({});
        res.json(games);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/games/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const game = yield GamesModel_1.GamesModel.findOne({ id: req.params.id });
        res.json(game);
    }
    catch (err) {
        console.error(err);
    }
}));
app.post('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGame = new GamesModel_1.GamesModel(req.body);
        const savedGame = yield newGame.save();
        res.json(savedGame);
    }
    catch (err) {
        console.error(err);
    }
}));
app.put('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGame = yield GamesModel_1.GamesModel.updateOne({ id: parseInt(req.params.id) }, req.body);
        res.json(updatedGame);
    }
    catch (err) {
        console.error(err);
    }
}));
app.delete('/games/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield GamesModel_1.GamesModel.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Game deleted' });
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/developers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const developers = yield Developers_1.DevelopersModel.find({});
        res.json(developers);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/developers/20', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const developers = yield Developers_1.DevelopersModel.find({}).limit(20);
        res.json(developers);
    }
    catch (err) {
        console.error(err);
    }
}));
app.post('/developers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDeveloper = new Developers_1.DevelopersModel(req.body);
        const savedDeveloper = yield newDeveloper.save();
        res.json(savedDeveloper);
    }
    catch (err) {
        console.error(err);
    }
}));
app.put('/developers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedDeveloper = yield Developers_1.DevelopersModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDeveloper);
    }
    catch (err) {
        console.error(err);
    }
}));
app.delete('/developers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Developers_1.DevelopersModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Developer deleted' });
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/developers/:name/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const developer = yield Developers_1.DevelopersModel.findOne({ name: req.params.name });
        const games = yield GamesModel_1.GamesModel.find({ developer_id: developer === null || developer === void 0 ? void 0 : developer.developer_id });
        res.json(games);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/developers/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const games = yield GamesModel_1.GamesModel.aggregate([
            {
                $group: {
                    _id: '$developer_id',
                    count: { $sum: 1 },
                },
            },
        ]);
        res.json(games);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.UserModel.find({});
        res.json(users);
    }
    catch (err) {
        console.error(err);
    }
}));
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield UserModel_1.UserModel.findOne({ name: req.body.name });
        if ((checkUser === null || checkUser === void 0 ? void 0 : checkUser.name) != null) {
            res.json({ message: "User already exists" });
        }
        else {
            const newUser = new UserModel_1.UserModel(req.body);
            const savedUser = yield newUser.save();
            res.json(savedUser);
        }
    }
    catch (err) {
        console.error(err);
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        const user = yield UserModel_1.UserModel.findOne({ name: req.body.name });
        if ((user === null || user === void 0 ? void 0 : user.password) === req.body.password) {
            const token = jsonwebtoken_1.default.sign({ name }, 'key', { expiresIn: '15m' });
            res.json({ message: "Login successful", token });
        }
        else {
            res.json({ message: "Login failed" });
        }
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/users/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.UserModel.findOne({ name: req.params.name });
        res.json(user);
    }
    catch (err) {
        console.error(err);
    }
}));
app.get('/developers/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const developer = yield Developers_1.DevelopersModel.findOne({ name: req.params.name });
        res.json(developer);
    }
    catch (err) {
        console.error(err);
    }
}));
exports.default = app;
