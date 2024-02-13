const texts = ["Igazából nem tudom, hogy te hogy vagy ezzel, de nekem ez az első valentinnapom...",
"...mármint technically a tizenkilencedik, amit megélek. De az első olyan, aminek számomra van jelentőssége, hiszen itt vagy nekem Te.",
"Őszintén szólva, elszomorodtam, amikor láttam, hogy pont nem leszel itthon ezen a szép napon, és nem tudunk találkozni.",
"Aztán viszont rájöttem, hogy ez nem változtat azon, hogy mennyire szeretlek.",
"Persze, jó lenne ezeket a mondatokat élőben, szóban elmondani, miközben átöleljük egymást. De kihozzuk a helyzetből a lehető legtöbbet, és arra gondoltam, hogy egy ilyen kis weboldal-szerűség segítségével írom mindezt le.",
"Tudod, hogy órákat és oldalakat tudnék itt írni rólunk, rólad, és mindarról, amit igazából nagyon röviden és tömören egy szóban is le tudok írni...",
"Dehát nem lenne Gergő-féle ajándék hosszas szöveg nélkül, szóval összeraktam egy gyors kis valamit:D",
"Ez az első szelfi, amit együtt csináltunk:",
"<img height='50%' width='50%' src='./media/20230616_204515.jpg'>",
"azon a szép június 16-án...",
"Vicces és egyben kicsit durva visszagondolni arra a napra. Szép emlék nagyon.",
"Nem gondoltam volna, hogy ma, majdnem 8 hónappal később, itt fogok ülni a gép előtt, és annak a lánynak írni, hogy mennyire szeretem, akinek a létezéséről még egy éve nem is tudtam, és 8 hónapja, épphogy ismerve egymást, a Zápor-tó partján ülve nézegettük a Vadaspark térképét.",
"Viszont nagyon nagyon boldog vagyok, hogy így alakult, és elmondhatatlanul szeretlek, drága Dorcim.",
"boldog valentinnapot baby, i love you<3"];
let index = 0;

function changeText(text) {
    document.getElementById("texts").innerHTML = document.getElementById("texts").innerHTML + "<p>" + texts[index] + "</p>";
    index += 1;
    if (index >= 14) {
        document.getElementById("button").innerHTML = "";
    }
}

function changeButtonText(text) {
    document.getElementById("button").innerHTML = text;
}