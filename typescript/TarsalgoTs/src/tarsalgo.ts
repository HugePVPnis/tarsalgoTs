export default class Tars {
    private ora: number;
    private perc: number;
    private id: number;
    private kibe: string;
    constructor(sor:string){
        const m:string[] = sor.split(" ");
        this.ora = parseInt(m[0]);
        this.perc = parseInt(m[1]);
        this.id = parseInt(m[2]);
        this.kibe = m[3];
    }
    public get GetOra(): number {
        return this.ora;
    }
    public get GetPerc(): number {
        return this.perc;
    }
    public get GetId():number {
        return this.id;
    }
    public get GetKibe():string {
        return this.kibe;
    }
}

