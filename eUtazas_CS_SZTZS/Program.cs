using System;
using System.Collections.Generic;
using System.IO;

namespace eutazas
{
    class ETicket
    {
        public int Megallo { get; set; }
        public string Idobelyeg { get; set; }
        public string KartyaID { get; set; }
        public string Tipus { get; set; }
        public string Ervenyes { get; set; }
        public int Db { get; set; }
        public ETicket(string adat)
        {
            string[] adatsor = adat.Split(' ');
            Megallo = int.Parse(adatsor[0]);
            Idobelyeg = adatsor[1];
            KartyaID = adatsor[2];
            Tipus = adatsor[3];
            if (Tipus == "JGY")
            {
                Db = int.Parse(adatsor[4]);
                Ervenyes = "-";
            }
            else
            {
                Ervenyes = adatsor[4];
                Db = -1;
            }
        }

        public bool Jo()
        {
            return (Db == -1 && Idobelyeg.Substring(0, 8).CompareTo(Ervenyes) < 1) || Db > 0;
        }

        public bool Kedv()
        {
            return (Tipus == "TAB" || Tipus == "NYB");
        }

        public bool Ingy()
        {
            return (Tipus == "NYP" || Tipus == "RVS" || Tipus == "GYK");
        }
    }

    class Program
    {
        static List<ETicket> Log = new List<ETicket>();

        static void F1_be()
        {
            StreamReader sr = new StreamReader("utasadat.txt");
            while (!sr.EndOfStream)
            {
                Log.Add(new ETicket(sr.ReadLine()));
            }
            sr.Close();
        }

        static int F3_erv()
        {
            int db = 0;
            for (int i = 0; i < Log.Count; i++)
            {
                if (!Log[i].Jo())
                {
                    db++;
                }
            }
            return db;
        }

        static void F4_maxfel()
        {
            int[] mdb = new int[31]; //elég 30, mert az utolsó megállóban nincs felszálló. De...
            for (int i = 0; i < 31; i++)
            {
                mdb[i] = 0;
            }
            for (int j = 0; j < Log.Count; j++)
            {
                mdb[Log[j].Megallo]++;
            }
            int maxi = 0;
            for (int i = 1; i < 31; i++)
            {
                if (mdb[i] > mdb[maxi])
                    maxi = i;
            }

            Console.WriteLine("A legtöbb utas ({0} fő) a {1}. megállóban próbált felszállni.", mdb[maxi], maxi);
        }

        static void F5_kimutat()
        {
            int kedv = 0;
            int ingy = 0;
            for (int i = 0; i < Log.Count; i++)
            {
                if (Log[i].Jo() && Log[i].Kedv())
                    kedv++;
                else if (Log[i].Jo() && Log[i].Ingy())
                    ingy++;
            }
            Console.WriteLine("Ingyenesen utazók száma: {0} fő\n" +
                "A kedvezményesen utazók száma: {1} fő", ingy, kedv);
        }

        //6. feladat
        static int Napokszama(int e1, int h1, int n1, int e2, int h2, int n2)
        {
            h1 = (h1 + 9) % 12;
            e1 = e1 - h1 / 10;
            int d1 = 365 * e1 + e1 / 4 - e1 / 100 + e1 / 400 + (h1 * 306 + 5) / 10 + n1 - 1;
            h2 = (h2 + 9) % 12;
            e2 = e2 - h2 / 10;
            int d2 = 365 * e2 + e2 / 4 - e2 / 100 + e2 / 400 + (h2 * 306 + 5) / 10 + n2 - 1;
            return d2 - d1;
        }

        static void F7_figyi()
        {
            StreamWriter sw = new StreamWriter("figyelmeztetes.txt");
            for (int i = 0; i < Log.Count; i++)
            {
                if (Log[i].Db == -1 && Log[i].Jo())
                {
                    int e1 = int.Parse(Log[i].Idobelyeg.Substring(0, 4));
                    int h1 = int.Parse(Log[i].Idobelyeg.Substring(4, 2));
                    int n1 = int.Parse(Log[i].Idobelyeg.Substring(6, 2));
                    int e2 = int.Parse(Log[i].Ervenyes.Substring(0, 4));
                    int h2 = int.Parse(Log[i].Ervenyes.Substring(4, 2));
                    int n2 = int.Parse(Log[i].Ervenyes.Substring(6, 2));

                    if (Napokszama(e1, h1, n1, e2, h2, n2) <= 3)
                    {
                        sw.WriteLine("{0} {1}", Log[i].KartyaID, Log[i].Ervenyes.Insert(4, "-").Insert(7, "-"));
                    }
                }
            }

            sw.Close();

        }

        static void Main(string[] args)
        {
            F1_be();

            Console.WriteLine("2. feladat");
            Console.WriteLine("A buszra {0} utas akart felszállni.", Log.Count);

            Console.WriteLine("3. feladat");
            Console.WriteLine("A buszra {0} utas nem szállhatott fel.", F3_erv());

            Console.WriteLine("4. feladat");
            F4_maxfel();

            Console.WriteLine("5. feladat");
            F5_kimutat();

            F7_figyi();
        }
    }
}
