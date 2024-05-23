class Developer{
 
    id: number;
    name: string;
    constructor(name:string, id:number){
        this.id = id;
        this.name = name;
    }
    getId():number{
        return this.id;
    }

    setId(id:number){
        this.id = id;
    }

    getName():string{
        return this.name;
    }

    setName(name:string){
        this.name = name;
    }


}

export default Developer;