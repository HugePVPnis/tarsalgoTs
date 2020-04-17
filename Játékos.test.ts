import Játékos from "./Játékos";

describe("Játékos osztály unit tesztek", () => {
    const instance: Játékos = new Játékos("Zoltán 2 2 3 4 5 2 3 1 1 3")
    it("Játékos osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Játékos);
    });
    it("Játékos neve", async () => {
        expect(instance.nev).toBe("Zoltán");
    });
    
    it("Fordulók száma", async () => {
        expect(instance.fordulókSzáma).toBe(10);
    });
    
    it("Legnagyobb tipp", async () => {
        expect(instance.legnagyobbTipp).toBe(5);
    });
    
    it("Első forduló tippje", async () => {
        expect(instance.elsőFordulóTippje).toBe(2);
    });
    
    it("Forduló tippjei(1-n)", async () => {
        const tippek: number[] = [2, 2 ,3, 4, 5, 2, 3, 1, 1, 3]
        for(let i = 1;i<=tippek.length; i++) {
            except(instance.fordulóTippje(i)).toBe(tippek[i-1]);
            
        }
    });
});