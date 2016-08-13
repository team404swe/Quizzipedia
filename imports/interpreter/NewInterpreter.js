import { Meteor } from 'meteor/meteor'

Meteor.methods({
    // DA CAMBIARE
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
   
    switch (m[1])
    {   case "VF":
            var element = {
                  type: m[1],
                  text: m[2],
                  ans: m[3]
                }; 
            break; 
        case "MU":
            var element = {
                type: m[1],
                text: m[2],
                ans: m[6],
                rightAns: getRightAnsMU()
            };
            break;
        case "MX":
            var element = {
                type: m[1],
                text: m[2],
                ans: m[6],
                rightAns: getRightAnsMX()
            };
            break; 
        case "AS":
            debugger;
            var sets = getAnswersAS(); 
            var rightAns = getRightAnsAS(sets[0], sets[1]);
            var element = {
                type: m[1],
                text: m[2],
                sets: sets,
                rightAns: rightAns
            };
            
            break;
        case "OD": // DA FARE
            //ok = checkOD(); // OD -> si controlla che ogni elemento abbia una posizione diversa
            break; 
        default:
            element = null; 
            //ok = false; 
        }
    //console.log(element);
    return element;    
}  

function getRightAnsMU()
{
    var re = /[\s]*isRight[\s]*=[\s]*\"yes\"[\s]*>(.*)<\/answer>[\s]*/;
    var s;
    var rAns = [];

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

            rAns.push(s[1]);  
            counter++;
        }
    }
    //debugger;
    if (counter == 1) return rAns;
    return null;
}

function getRightAnsMX()
{
    var re = /[\s]*isRight[\s]*=[\s]*\"yes\"[\s]*>(.*)<\/answer>[\s]*/;
    var s;
    var rAns = [];

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

            rAns.push(s[1]);  
            counter++;
        }
    }
    //debugger;
    if (counter >= 1) return rAns;
    return null;
}


function getAnswersAS()
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
    
    var A = [],
        B = [];

    for (var i = 0; i < lines.length; i++)
    {
        if ((s = reA.exec(lines[i])) !== null) // cerco i match per l'insieme A
        {   
            if (s.index === reA.lastIndex) 
                reA.lastIndex++;

            var element  = {
                text: s[3],
                pos: s[2]
            };
            A.push(element);
        }

        if ((s = reB.exec(lines[i])) !== null) // cerco i match per l'insieme B
        {
            if (s.index === reB.lastIndex) 
                reB.lastIndex++;
            
            var element  = {
                text: s[3],
                pos: s[2]
            };
            B.push(element);
        }
    }
    debugger;

    return [A, B];  // ritorna un elemento con due array A e B con i rispettivi campi A.text e A.pos
} 

function getRightAnsAS(A, B)
{   
    var set = [];
    var first,
        second;

    if(A.length <= B.length)
    {
        first = A;
        second = B;
    }
    else 
    {
        first = B;
        second = A;
    }

    for (var i = 0; i < first.length; i++)
    {
        for (var j = 0; j < second.length; j++)
        {
            if(first[i].pos === second[j].pos)
            {
                var temp = [first[i].text, second[j].text];
                set.push(temp);
            }
                
        }
    }
    console.log(set);
    return set; 
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

