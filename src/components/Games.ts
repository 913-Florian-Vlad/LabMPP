
class Games 
{//react context
    private name:string;
    private genre:string;
    private release_date:string;
    private game_id:string;
    private size:number;
    constructor(name:string, genre:string, release_date:string,size:number ,game_id:string )
    {
        this.name = name;
        this.genre = genre;
        this.release_date = release_date;
        this.game_id = game_id;
        this.size = size;
    }

    public getGameSize():number
    {
        return this.size;
    }

    public setGameSize(size:number)
    {
        this.size = size;
    }

    public getGameName():string
    {
        return this.name;
    }

    public getGameGenre():any
    {
        return this.genre;
    }

    public getGameReleaseDate():string
    {
        return this.release_date;
    }

    public getGameId():string
    {
        return this.game_id;
    }
    
    public setGameName(name:string)
    {
        this.name = name;
    }

    public setGameGenre(genre:string)
    {
        this.genre = genre;
    }

    public setGameReleaseDate(release_date:string)
    {
        this.release_date = release_date;
    }

    public setGameId(game_id:string)
    {
        this.game_id = game_id;
    }
}

export default Games;