/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Games {
  //react context
  private name: string;
  private genre: string;
  private release_date: string;
  private _id: string;
  private size: number;
  private developer_id: number;

  constructor(name: string, genre: string, release_date: string, size: number, game_id: string, developer_id: number) {
    this.name = name;
    this.genre = genre;
    this.release_date = release_date;
    this._id = game_id;
    this.size = size;
    this.developer_id = developer_id;
  }

  public getGameSize(): number {
    return this.size;
  }

  public setGameSize(size: number) {
    this.size = size;
  }

  public getGameName(): string {
    return this.name;
  }

  public getGameGenre(): any {
    return this.genre;
  }

  public getGameReleaseDate(): string {
    return this.release_date;
  }

  public getGameId(): string {
    return this._id;
  }

  public setGameName(name: string) {
    this.name = name;
  }

  public setGameGenre(genre: string) {
    this.genre = genre;
  }

  public setGameReleaseDate(release_date: string) {
    this.release_date = release_date;
  }

  public setGameId(game_id: string) {
    this._id = game_id;
  }

  public toJSON() {
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

export default Games;
