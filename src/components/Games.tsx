
class Games 
{//react context
    private name:string;
    private genre:string;
    private release_date:string;
    private game_id:number;
    private size:number;
    private developer_id:number;



    constructor(name:string, genre:string, release_date:string,size:number , developer_id:number,game_id:number )
    {
        this.name = name;
        this.genre = genre;
        this.release_date = release_date;
        this.game_id = game_id;
        this.size = size;
        this.developer_id = developer_id;
    }

    public getDeveloperId():number
    {
        return this.developer_id;
    }

    public setDeveloperId(developer_id:number)
    {
        this.developer_id = developer_id;
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

    public getGameGenre():string
    {
        return this.genre;
    }

    public getGameReleaseDate():string
    {
        return this.release_date;
    }

    public getGameId():number
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

    public setGameId(game_id:number)
    {
        this.game_id = game_id;
    }
}

export default Games;