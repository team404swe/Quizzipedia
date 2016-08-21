/***** DEFINIZIONE ESPRESSIONI REGOLARI PER I QUATTRO TIPI DI DOMANDE: *****/
// VF = DOMANDA VERO FALSO
// MU = RISPOSTA MULTIPLA (CON UNA SOLA RISPOSTA ESATTA)
// MX = RISPOSTA MULTIPLA (CON PIÙ RISPOSTE ESATTE)
// AS = DOMANDA ASSOCIAZIONE
// OD = DOMANDA ORDINAMENTO
var VF = /^[\s]*<question [\s]*type[\s]*=[\s]*"(VF)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>[\s]*<\/question>[\s]*$/;
var MU = /^[\s]*<question [\s]*type[\s]*=[\s]*"(MU)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*((<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;
var MX = /^[\s]*<question [\s]*type[\s]*=[\s]*"(MX)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*((<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;
var AS = /^[\s]*<question [\s]*type[\s]*=[\s]*"(AS)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*((<answer [\s]*set[\s]*=[\s]*"(A|B)" [\s]*pos[\s]*=[\s]*"(\d)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;
var OD = /^[\s]*<question [\s]*type[\s]*=[\s]*"(OD)">[\s]*<text>[\s]*(.*)[\s]*<\/text>[\s]*((<answer [\s]*pos[\s]*=[\s]*"(\d)"[\s]*>(.*)<\/answer>[\s]*){2,})<\/question>[\s]*$/;

var str; // stringa in cui viene memorizzato il testo di input compilato dall'utente
var m; // array in cui viene memorizzata la domanda scomposta secondo l'espressione regolare definita
// per capire il funzionamento della funzione exec() e quindi la variabile m risultante, basta guardare questo sito:
// https://regex101.com/ dove metti l'espressione regolare e il testo che vuoi controllare e vedi come viene suddiviso il testo.
// l'array m quindi contiene tutti i gruppi definiti dalle parentesi tonde delle espressioni regolari

export default function QML2HTML(QMLtesto)
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
                  ans: getAnswerVF() //m[3]
                }; 
            break; 
        case "MU":
            var rightAns = getRightAnsMU();
            var element = {
                type: m[1],
                text: m[2],
                ans: getAnswerMU(), //m[6],
                rightAns: rightAns
            };
            break;
        case "MX":
            var rightAns = getRightAnsMX();
            var element = {
                type: m[1],
                text: m[2],
                ans: getAnswerMX(), // m[6],
                rightAns: rightAns
            };
            break; 
        case "AS":
            debugger;
            var sets = getAnswersAS(); 
            var rightAns = getRightAnsAS(sets.A, sets.B);
            var element = {
                type: m[1],
                text: m[2],
                ans: sets, // 
                rightAns: rightAns
            };
            
            break;
        case "OD": // DA FARE
            var ans = getAnsOD();
            var rightAns = getRightAnsOD(ans);
            //var orderedAns = getOrderedAnsOD(set);
            var element = {
                type: m[1],
                text: m[2],
                ans: ans,
                rightAns: rightAns,
				risp: {}
                //orderedSet:
            };
            //ok = checkOD(); // OD -> si controlla che ogni elemento abbia una posizione diversa
            break; 
        default:
            element = null; 
            //ok = false; 
        }
    //console.log(element);
    return element;    
}  

function getAnswerVF()
{
	if (m[3] === "yes") return true;
	else return false;
}
function getRightAnsMU()
{
    var re = /[\s]*isRight[\s]*=[\s]*\"yes\"[\s]*>(.*)<\/answer>[\s]*/;
    var s;
    var rAns;

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

            rAns = i;  
            counter++;
        }
    }
    //debugger;
    if (counter == 1) return rAns;
    return null;
}

function getRightAnsMX()
{
    var re = /[\s]*isRight[\s]*=[\s]*\"(yes|no)\"[\s]*>(.*)<\/answer>[\s]*/;
    var s;
    var rAns = {};

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
            var element;
            if (s.index === re.lastIndex) 
                re.lastIndex++;

            if(s[1]==="yes"){
                counter++;
                rAns[i] =  true; // element = { i: true };
            }
            else 
                rAns[i] =  false;// element = { i: false };
        }
        //rAns.push(element);
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
                id: s[2]
            };
            A.push(element);
        }

        if ((s = reB.exec(lines[i])) !== null) // cerco i match per l'insieme B
        {
            if (s.index === reB.lastIndex) 
                reB.lastIndex++;
            
            var element  = {
                text: s[3],
                id: s[2]
            };
            B.push(element);
        }
    }
    debugger;
    var element = {
        A: A,
        B: B
    }
    return element;  // ritorna un elemento con due array A e B con i rispettivi campi A.text e A.id
} 

function getRightAnsAS(A, B)
{   
    var set = {};
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
            if(first[i].id === second[j].id)
            {
                var temp = [first[i].text, second[j].text];
                set[first[i].id] = second[i].id;
            }
        } 
    }
    console.log(set);
    return set; 
}

function getAnsOD()
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

    for (var i = 0; i < lines.length; i++)
    {   
        if ((s = reA.exec(lines[i])) !== null) // cerco i match per l'insieme A
        {   
            if (s.index === reA.lastIndex) 
                reA.lastIndex++;

            var element  = {
                text: s[2],
                id: s[1]
            };
            A.push(element);
        }
        debugger;
    }
    for (var i = 0; i < A.length; i++) {
        console.log(A[i].pos);
    }
    
    return A;
}

function getRightAnsOD(ans)
{
    var rAns ={}; //[ans.length];
	var tmp = [];

    for (var i = 0; i < ans.length; i++) 
		tmp.push(ans[i].id);
	tmp.sort();
	for (var i = 0; i < tmp.length; i++) 
        rAns[i+1] = tmp[i];
    
    return rAns;
}

function getAnswerMU()
{
    var re ;
	re = /<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>/ ; 	
	var s;

    var lines = m[3].split('\n');
    
    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 

    for (var i = 0; i < lines.length; i++)
    {
        if ((s = re.exec(lines[i])) !== null)
		{
            if (s.index === re.lastIndex) 
			{ re.lastIndex++; }
			
			lines[i] = {text: s[2], id: i };
			
		}
    }
    return lines;
}
function getAnswerMX()
{
    var re ;
	re = /<answer [\s]*isRight[\s]*=[\s]*"(yes|no)"[\s]*>(.*)<\/answer>/ ; 	
	var s;

    var lines = m[3].split('\n');
    
    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 

    for (var i = 0; i < lines.length; i++)
    {
        if ((s = re.exec(lines[i])) !== null)
		{
            if (s.index === re.lastIndex) 
			{ re.lastIndex++; }
			
			lines[i] = {text: s[2], id: i };
			
		}
    }
    return lines;
}