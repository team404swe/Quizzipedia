import { Meteor } from 'meteor/meteor'

Meteor.methods({
    
    "parser.check" (QMLTesto) {
        
        if(!checkQML(QMLTesto))
            return false;
        else
            return true;

    }
    
});

/***** DEFINIZIONE ESPRESSIONI REGOLARI PER I QUATTRO TIPI DI DOMANDE: *****/
// VF = DOMANDA VERO FALSO
// MU = RISPOSTA MULTIPLA (CON UNA SOLA RISPOSTA ESATTA)
// MX = RISPOSTA MULTIPLA (CON PIÙ RISPOSTE ESATTE)
// AS = DOMANDA ASSOCIAZIONE
// OD = DOMANDA ORDINAMENTO
var VF = /^[\s]*<question [\s]*type[\s]*=[\s]*"(VF)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>[\s]*<\/question>[\s]*$/;

var MU = /^[\s]*<question [\s]*type[\s]*=[\s]*"(MU)">[\s]*<text>[\s]*(.*)[\s]*<\/text>(([\s]*<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;

var MX = /^[\s]*<question [\s]*type[\s]*=[\s]*"(MX)">[\s]*<text>[\s]*(.*)[\s]*<\/text>(([\s]*<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;

var AS = /^[\s]*<question [\s]*type[\s]*=[\s]*"(AS)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*((<answer [\s]*set[\s]*=[\s]*"(A|B)" [\s]*pos[\s]*=[\s]*"(\d)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;

var OD = /^[\s]*<question [\s]*type[\s]*=[\s]*"(OD)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*((<answer [\s]*pos[\s]*=[\s]*"(\d)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;

var str; // stringa in cui viene memorizzato il testo di input compilato dall'utente
var m; // array in cui viene memorizzata la domanda scomposta secondo l'espressione regolare definita
// per capire il funzionamento della funzione exec() e quindi la variabile m risultante, basta guardare questo sito:
// https://regex101.com/ dove metti l'espressione regolare e il testo che vuoi controllare e vedi come viene suddiviso il testo.
// l'array m quindi contiene tutti i gruppi definiti dalle parentesi tonde delle espressioni regolari

export default function checkQML(QMLtesto)
{    
    // AR è l'array che contiene le espressioni regolari definite globalmente fuori dalla funzione
    var AR = [VF, MU, AS, MX, OD];
    var match = false;
    // questo ciclo controlla tramite il metodo exec() se il testo matcha
    // con una delle espressioni regolari definite dell'array AR
    for (var i = 0; i < AR.length && !match; i++)
    {
        //debugger;
        if ((m = AR[i].exec(QMLtesto)) !== null)
        {
            match = true; 
            if (m.index === AR[i].lastIndex) 
                AR[i].lastIndex++;
        }
        else match = false; 
    }
    if(!match) return false; 

   // dopo il match generale serve un controllo sulla coerenza delle risposte date:
   // 
   
    var ok = false; 
   
    switch (m[1])
    {   case "VF":
            ok = true;      // VF -> non si esegue nessun controllo perchè basta il parsing precedente in quanto non ci sono risposte a parte una
            break; 
        case "MU":
            ok = checkMU(); // MU -> si controlla che ci sia solo una risposta giusta
            break;
        case "MX":
            ok = checkMX(); // MX -> si controlla che ci siano almeno una risposta giusta (si può cambiare e mettere > 2)
            break; 
        case "AS":
            ok = checkAS(); // AS -> si controlla che per ogni insieme non ci siano elementi con lo stesso indice
            break;
        case "OD":
            ok = checkOD(); // OD -> si controlla che ogni elemento abbia una posizione diversa
            break; 
        default:
            ok = false; 
        }
   return ok; 
    
}  
//funzione che controlla se la domanda di tipo MU ha solo una risposta giusta
//ritorna un bool
function checkMU()
{
    var re = /[\s]*isRight[\s]*=[\s]*"(yes)"[\s]*/;
    var s;
    
    var lines = m[3].split('\n');
    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 
    var counter = 0; 
    for (var i = 0; i < lines.length; i++)
    {
        if ((s = re.exec(lines[i])) !== null)
        {
            if (s.index === re.lastIndex) 
                re.lastIndex++;
                
            counter++;
                //lines[i] = {text: s[1], id: i };
        }
    }
    //debugger;
    if (counter == 1) return true;
    return false;
}

//funzione che controlla se la domanda di tipo MX ha almeno una risposta giusta
//ritorna un bool
function checkMX()
{
    var re = /[\s]*isRight[\s]*=[\s]*"(yes)"[\s]*/;
    var s;
    
    var lines = m[3].split('\n');
    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 
    var counter = 0; 
    for (var i = 0; i < lines.length; i++)
    {
        if ((s = re.exec(lines[i])) !== null)
        {
            if (s.index === re.lastIndex) 
                re.lastIndex++;
                
            counter++;
                //lines[i] = {text: s[1], id: i };
        }
    }
    //debugger;
    if (counter >= 1) return true;
    return false;
}  

function checkAS()
{
    var reA = /<answer [\s]*set[\s]*=[\s]*"(A)" [\s]*pos[\s]*=[\s]*"(\d)"[\s]*>(.*)<\/answer>/;
    var reB = /<answer [\s]*set[\s]*=[\s]*"(B)" [\s]*pos[\s]*=[\s]*"(\d)"[\s]*>(.*)<\/answer>/;
    var s;
    //debugger;
    var lines = m[3].split('\n');
    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 
    //debugger; 
    var matchA = true,
        matchB = true;
    var A = [],
        B = [];

    for (var i = 0; i < lines.length; i++)
    {
        if ((s = reA.exec(lines[i])) !== null) // cerco i match per l'insieme A
        {   
            if (s.index === reA.lastIndex) 
                reA.lastIndex++;

            if (!checkPos(A, s[2]))
                A.push(s[2]);
            else 
                matchA = false;
        }

        if ((s = reB.exec(lines[i])) !== null) // cerco i match per l'insieme B
        {
            if (s.index === reB.lastIndex) 
                reB.lastIndex++;
            if (!checkPos(B, s[2]))
                B.push(s[2]);
            else 
                matchB = false;
        }
    }
    if(matchA && matchB) return true; 
    else return false; 
    
} 

//ritorna true se trova che una posizione di quell'insieme è già stata usata
function checkPos(A, val)
{
    var match = false; 
    for (var i = 0; i < A.length && !match; i++) 
        if (A[i] === val)
            match = true; 
    //debugger; 
    return match;
    
}

function checkOD()
{
    var reA = /<answer [\s]*pos[\s]*=[\s]*"(\d)"[\s]*>(.*)<\/answer>/;
    var s;
    //debugger;
    var lines = m[3].split('\n');
    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 
    //debugger; 
    var matchA = true;
        
    var A = [];

    for (var i = 0; i < lines.length && matchA; i++)
    {   
        if ((s = reA.exec(lines[i])) !== null) // cerco i match per l'insieme A
        {   
            if (s.index === reA.lastIndex) 
                reA.lastIndex++;

            if (!checkPos(A, s[1]))
                A.push(s[1]);
            else 
                matchA = false;
        }
        //debugger;
    }
    if(matchA) return true; 
    else return false; 
}
