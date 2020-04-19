import fs from "fs";
import Tars from "./tarsalgo";
export default class Megoldas {
    private Tarsak: Tars[] = [];
    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSor = i.trim();
                if (aktSor.length > 0) this.Tarsak.push(new Tars(aktSor));
            });
    }
    public get ElsoId(): string {
        let ElsoId = "";
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra == 9 && this.Tarsak[i].GetPerc == 1) ElsoId = this.Tarsak[i].GetKibe;
        }
        return ElsoId.toString();
    }
    public get UtolsoId(): string {
        let UtoloId = "";
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra == 14 && this.Tarsak[i].GetPerc == 59) UtoloId = this.Tarsak[i].GetKibe;
        }
        return UtoloId.toString();
    }
    public get LegtobbBent(): string {
        let count = 0;
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra == 14 && this.Tarsak[i].GetPerc == 35) {
                count++;
            }
        }
        return count.toString();
    }
    public get Azonos(): number {
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra == 14 && this.Tarsak[i].GetPerc == 35) {
                i = this.Tarsak.GetId;
            }
        }
        return this.Tarsak.GetId;
    }
}
