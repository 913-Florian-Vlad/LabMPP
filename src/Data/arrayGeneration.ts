/* eslint-disable @typescript-eslint/no-explicit-any */
import Games from './Games';
import { DevelopersModel, IDevelopers } from './Developers';
import { ar, faker } from '@faker-js/faker';
import { GamesModel, IGames } from './GamesModel';

const arrayOfAdventures: string[] = [
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
const arrayOfGenres: string[] = [
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
const arrayOfPrefixes: string[] = ['The', 'A'];
const arrayofAdjectives: string[] = [];
const arrayofNouns: string[] = [];

for (let i = 0; i < 100; i++) {
  arrayofNouns.push(faker.word.noun());
}

for (let i = 0; i < 100; i++) {
  arrayofAdjectives.push(faker.word.adjective());
}

for (let i = 0; i < 100; i++) {
  arrayofAdjectives[i] = arrayofAdjectives[i].charAt(0).toUpperCase() + arrayofAdjectives[i].slice(1);
}

for (let i = 0; i < 100; i++) {
  arrayofNouns[i] = arrayofNouns[i].charAt(0).toUpperCase() + arrayofNouns[i].slice(1);
}

// export function generateGames(developersData: Developers[]): Games[] {
//   const array = [];
//   for (let i = 0; i < 20; i++) {
//     const number_game: string =
//       faker.number.int({ min: 1, max: 3 }).toString() == '1' ? faker.number.int({ min: 1, max: 6 }).toString() : '';
//     const game_name: String =
//       arrayOfPrefixes[faker.number.int(arrayOfPrefixes.length - 1)] +
//       ' ' +
//       arrayofAdjectives[faker.number.int(arrayofAdjectives.length - 1)] +
//       ' ' +
//       arrayOfAdventures[faker.number.int(arrayOfAdventures.length - 1)] +
//       ' of ' +
//       arrayofNouns[faker.number.int(arrayofNouns.length - 1)] +
//       ' ' +
//       number_game;
//     const date: string =
//       faker.date.month() +
//       ' ' +
//       faker.number.int({ min: 1, max: 29 }) +
//       ', ' +
//       faker.number.int({ min: 2000, max: 2024 });
//     const developer_id: string = developersData[faker.number.int(developersData.length - 1)]._id;

//     const gameData = {
//       name: game_name.toString(),
//       genre: arrayOfGenres[faker.number.int(arrayOfGenres.length - 1)],
//       release_date: date.toString(),
//       size: faker.number.int({ min: 10, max: 187 }),
//       developer_id: developer_id,
//     };
//     const game = new GamesModel(gameData);
//     const savedGame = game.save();
//   }

//   return array;
// }
export async function generateNewGame(): Promise<IGames> {
  const number_game: string =
    faker.number.int({ min: 1, max: 3 }).toString() == '1' ? faker.number.int({ min: 1, max: 6 }).toString() : '';
  const game_name: String =
    arrayOfPrefixes[faker.number.int(arrayOfPrefixes.length - 1)] +
    ' ' +
    arrayofAdjectives[faker.number.int(arrayofAdjectives.length - 1)] +
    ' ' +
    arrayOfAdventures[faker.number.int(arrayOfAdventures.length - 1)] +
    ' of ' +
    arrayofNouns[faker.number.int(arrayofNouns.length - 1)] +
    ' ' +
    number_game;
  const date: string =
    faker.date.month() +
    ' ' +
    faker.number.int({ min: 1, max: 29 }) +
    ', ' +
    faker.number.int({ min: 2000, max: 2024 });

  const developer_id_random = faker.number.int({ min: 0, max: 100000 });
  
  const gameData = {
    name: game_name.toString(),
    genre: arrayOfGenres[faker.number.int(arrayOfGenres.length - 1)],
    release_date: date.toString(),
    size: faker.number.int({ min: 10, max: 187 }),
    developer_id: developer_id_random,
  };
  const game = new GamesModel(gameData);
  const savedGame = await game.save();
  return savedGame;
}

export async function generateNewDeveloper(): Promise<IDevelopers> {
  const developerData = {
    name: faker.person.firstName(),
  };
  const developer = new DevelopersModel(developerData);
  const savedDeveloper = await developer.save();
  return savedDeveloper;
}

//function to generate 100000 games and developers
export async function boom(): Promise<void> {
    return;
}

