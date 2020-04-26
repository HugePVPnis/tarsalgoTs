/* eslint-disable prefer-const */
import fs from "fs";
import Tars from "./tarsalgo";
import { AsyncLocalStorage } from "async_hooks";
import Content from "./Content";
import { isNullOrUndefined } from "util";
import { throws } from "assert";
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
        let ElsoId = 0;
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra === 10 && this.Tarsak[i].GetPerc === 0 && this.Tarsak[i].GetKibe === "be") ElsoId = this.Tarsak[i].GetId;
        }
        return ElsoId.toString();
    }
    public get UtolsoId(): string {
        let UtoloId = 0;
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra === 10 && this.Tarsak[i].GetPerc === 0 && this.Tarsak[i].GetKibe === "ki") UtoloId = this.Tarsak[i].GetId;
        }
        return UtoloId.toString();
    }
    public get LegtobbBent(): string {
        let count = 0;
        let count1 = 0;
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra === 14 && this.Tarsak[i].GetPerc === 35) {
                count = this.Tarsak[i].GetOra;
                count1 = this.Tarsak[i].GetPerc;
            }
        }
        return count.toString() + ":" + count1.toString();
    }
    public get negyedikfeladat(): number[] {
        const azonositok: number[] = [];
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetOra === 14 && this.Tarsak[i].GetPerc === 35) azonositok.push(this.Tarsak[i].GetId);
        }
        return azonositok;
    }
    public hetedikfeladat(azon: number): string {
        // eslint-disable-next-line prefer-const
        let orabe = 0;
        let percbe = 0;
        let oraki = 0;
        let percki = 0;
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetId === azon && this.Tarsak[i].GetKibe === "be") {
                orabe === this.Tarsak[i].GetOra;
                percbe === this.Tarsak[i].GetPerc;
            }
        }
        for (let i = 0; i < this.Tarsak.length; i++) {
            if (this.Tarsak[i].GetId === azon && this.Tarsak[i].GetKibe === "ki") {
                oraki === this.Tarsak[i].GetOra;
                percki === this.Tarsak[i].GetPerc;
            }
        }
        return orabe + ":" + percbe + "\n" + oraki + ":" + percki;
    }
}
