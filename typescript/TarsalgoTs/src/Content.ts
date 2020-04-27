import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title> Társalgó</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // 1. Olvassa be és tárolja el az ajto.txt fájl tartalmát!
        const params = url.parse(req.url as string, true).query;
        const megold: Megoldas = new Megoldas("ajto.txt");
        res.write("A fájl sikeresen beolvasva!\n");
        //2. Írja a képernyőre annak a személynek az azonosítóját, aki a vizsgált időszakon belül először
        //lépett be az ajtón, és azét, aki utoljára távozott a megfigyelési időszakban!
        res.write("2. feladat:");
        res.write(`<p>Az első belépő: ${megold.ElsoId}</p>`);
        res.write(`<p>Az utolsó kilépő: ${megold.UtolsoId}</p>`);

        // 3. Határozza meg a fájlban szereplő személyek közül, ki hányszor haladt át a társalgó ajtaján!
        // A meghatározott értékeket azonosító szerint növekvő sorrendben írja az athaladas.txt
        // fájlba! Soronként egy személy azonosítója, és tőle egy szóközzel elválasztva az áthaladások
        // száma szerepeljen!
        // 4. Írja a képernyőre azon személyek azonosítóját, akik a vizsgált időszak végén a társalgóban
        // tartózkodtak!

        res.write("4. feladat:");
        res.write(`<p>A végén a társalgóban voltak: ${megold.negyedikfeladat}</p>`);

        //res.write(`<p>\t${megold.Azonos} voltak bent ebben az időben.</p>`);
        //  5. Hányan voltak legtöbben egyszerre a társalgóban? Írjon a képernyőre egy olyan időpontot
        //  (óra:perc), amikor a legtöbben voltak bent!

        res.write("5. feladat:");
        res.write(`<p>${megold.LegtobbBent}-kor voltak a legtöbben bent.</p>`);
        const azonosító: string = params.azon as string;
        res.write("6. feladat:");
        // 6. Kérje be a felhasználótól egy személy azonosítóját! A további feladatok megoldásánál ezt használja fel!
        res.write(`\nKérem az azonosítot: <input type='number' name='azon' value=${azonosító} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(megold.hetedikfeladat(parseInt(azonosító)));

        res.write("</body></html>");
        res.end();
    }
}
