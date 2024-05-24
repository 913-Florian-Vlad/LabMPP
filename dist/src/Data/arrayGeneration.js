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
exports.boom = exports.generateNewDeveloper = exports.generateNewGame = void 0;
const Developers_1 = require("./Developers");
const faker_1 = require("@faker-js/faker");
const GamesModel_1 = require("./GamesModel");
const arrayOfAdventures = [
    'Adventure',
    'Odyssey',
    'Journey',
    'Quest',
    'Saga',
    'Voyage',
    'Expedition',
    'Exploration',
    'Travel',
    'Trip',
    'Tour',
    'Hike',
    'Safari',
    'Pilgrimage',
    'Excursion',
    'Jaunt',
    'Trek',
    'Crossing',
    'Cruise',
    'Sail',
    'Flight',
    'Drive',
    'Ride',
    'Walk',
    'Stroll',
    'Ramble',
    'Hike',
    'Trek',
    'Journey',
    'Excursion',
    'Tour',
    'Safari',
    'Adventure',
    'Expedition',
    'Voyage',
    'Trip',
    'Travel',
    'Pilgrimage',
    'Odyssey',
    'Exploration',
    'Journey',
    'Quest',
    'Saga',
    'Voyage',
    'Expedition',
    'Exploration',
    'Travel',
    'Trip',
    'Tour',
    'Hike',
    'Safari',
    'Pilgrimage',
    'Excursion',
    'Jaunt',
    'Trek',
    'Crossing',
    'Cruise',
    'Sail',
    'Flight',
    'Drive',
    'Ride',
    'Walk',
    'Stroll',
    'Ramble',
    'Hike',
    'Trek',
    'Journey',
    'Excursion',
    'Tour',
    'Safari',
    'Adventure',
    'Expedition',
    'Voyage',
    'Trip',
    'Travel',
    'Pilgrimage',
    'Odyssey',
    'Exploration',
    'Journey',
    'Quest',
    'Saga',
    'Voyage',
    'Expedition',
    'Exploration',
    'Travel',
    'Trip',
    'Tour',
    'Hike',
    'Safari',
    'Pilgrimage',
    'Excursion',
    'Jaunt',
    'Trek',
    'Crossing',
    'Cruise',
    'Sail',
    'Flight',
    'Drive',
    'Ride',
    'Walk',
    'Stroll',
    'Ramble',
    'Hike',
    'Trek',
    'Journey',
    'Excursion',
    'Tour',
    'Safari',
    'Adventure',
    'Expedition',
    'Voyage',
    'Trip',
    'Travel',
    'Pilgrimage',
    'Odyssey',
    'Exploration',
    'Journey',
    'Quest',
    'Saga',
    'Voyage',
    'Expedition',
    'Exploration',
    'Travel',
    'Trip',
    'Tour',
    'Hike',
    'Safari',
    'Pilgrimage',
    'Excursion',
    'Jaunt',
];
const arrayOfGenres = [
    'RPG',
    'Action-Adventure',
    'Action',
    'Simulator',
    'Strategy',
    'Sports',
    'Puzzle',
    'Idle',
    'Racing',
    'Horror',
    'Survival',
    'Shooter',
    'Platformer',
    'MMO',
    'MOBA',
    'RTS',
    'Rhythm',
    'Fighting',
    'Stealth',
    'Sandbox',
    'Open-World',
    'Battle-Royale',
    'Metroidvania',
    'Educational',
    'Casual',
    'Arcade',
    'Adventure',
    'Visual-Novel',
    'Roguelike',
    'Roguelite',
    'Deck-Building',
    'Tower-Defense',
    'Tactical',
    'Party',
    'Music',
    'Life-Sim',
    'Hack-and-Slash',
    'Grand-Strategy',
    'God-Game',
    'Flight-Sim',
    'Farming',
    'Dungeon-Crawler',
    'Dating-Sim',
    'City-Builder',
    'Card-Game',
    'Bullet-Hell',
    'Board-Game',
    'Beat-Em-Up',
    'Auto-Battler',
    'Art',
    '4X',
    '2D',
    '3D',
    'VR',
    'AR',
    'Text-Based',
    'Top-Down',
    'Side-Scroller',
    'Real-Time',
    'Turn-Based',
    'Point-and-Click',
    'Multiplayer',
    'Singleplayer',
    'Co-op',
    'Competitive',
    'PvP',
    'PvE',
    'Local-Multiplayer',
    'Online-Multiplayer',
    'Cross-Platform',
    'Split-Screen',
    'LAN',
    'Couch-Co-op',
    'Asymmetrical',
    'Battle-Arena',
    'Battle-Royale',
    'Survival',
    'Survival-Horror',
    'Survival-Sandbox',
    'Survival-Crafting',
    'Survival-Adventure',
    'Survival-Action',
    'Survival-RPG',
    'Survival-Shooter',
    'Survival-Open-World',
    'Survival-MMO',
    'Survival-Simulation',
    'Survival-Strategy',
    'Survival-FPS',
    'Survival-TPS',
    'Survival-Stealth',
    'Survival-Base-Building',
    'Survival-Management',
    'Survival-Exploration',
    'Survival-Indie',
    'Survival-Sci-Fi',
    'Survival-Fantasy',
    'Survival-Zombie',
    'Survival-Wilderness',
    'Survival-Post-Apocalyptic',
    'Survival-Dystopian',
    'Survival-Desert-Island',
    'Survival-Underwater',
    'Survival-Isometric',
    'Survival-Top-Down',
    'Survival-Side-Scroller',
    'Survival-Realistic',
    'Survival-Cartoony',
    'Survival-2D',
    'Survival-3D',
    'Survival-VR',
    'Survival-AR',
    'Survival-Text-Based',
    'Survival-Top-Down',
    'Survival-Side-Scroller',
    'Survival-Real-Time',
    'Survival-Turn-Based',
];
const arrayOfPrefixes = ['The', 'A'];
const arrayofAdjectives = [];
const arrayofNouns = [];
for (let i = 0; i < 100; i++) {
    arrayofNouns.push(faker_1.faker.word.noun());
}
for (let i = 0; i < 100; i++) {
    arrayofAdjectives.push(faker_1.faker.word.adjective());
}
for (let i = 0; i < 100; i++) {
    arrayofAdjectives[i] = arrayofAdjectives[i].charAt(0).toUpperCase() + arrayofAdjectives[i].slice(1);
}
for (let i = 0; i < 100; i++) {
    arrayofNouns[i] = arrayofNouns[i].charAt(0).toUpperCase() + arrayofNouns[i].slice(1);
}
function generateNewGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const number_game = faker_1.faker.number.int({ min: 1, max: 3 }).toString() == '1' ? faker_1.faker.number.int({ min: 1, max: 6 }).toString() : '';
        const game_name = arrayOfPrefixes[faker_1.faker.number.int(arrayOfPrefixes.length - 1)] +
            ' ' +
            arrayofAdjectives[faker_1.faker.number.int(arrayofAdjectives.length - 1)] +
            ' ' +
            arrayOfAdventures[faker_1.faker.number.int(arrayOfAdventures.length - 1)] +
            ' of ' +
            arrayofNouns[faker_1.faker.number.int(arrayofNouns.length - 1)] +
            ' ' +
            number_game;
        const date = faker_1.faker.date.month() +
            ' ' +
            faker_1.faker.number.int({ min: 1, max: 29 }) +
            ', ' +
            faker_1.faker.number.int({ min: 2000, max: 2024 });
        const developer_id_random = faker_1.faker.number.int({ min: 0, max: 100000 });
        const gameData = {
            name: game_name.toString(),
            genre: arrayOfGenres[faker_1.faker.number.int(arrayOfGenres.length - 1)],
            release_date: date.toString(),
            size: faker_1.faker.number.int({ min: 10, max: 187 }),
            developer_id: developer_id_random,
        };
        const game = new GamesModel_1.GamesModel(gameData);
        const savedGame = yield game.save();
        return savedGame;
    });
}
exports.generateNewGame = generateNewGame;
function generateNewDeveloper() {
    return __awaiter(this, void 0, void 0, function* () {
        const developerData = {
            name: faker_1.faker.person.firstName(),
        };
        const developer = new Developers_1.DevelopersModel(developerData);
        const savedDeveloper = yield developer.save();
        return savedDeveloper;
    });
}
exports.generateNewDeveloper = generateNewDeveloper;
function boom() {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
exports.boom = boom;
