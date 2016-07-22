import { Meteor } from 'meteor/meteor'

Meteor.methods({
	
	"parser.check" (QMLTesto) {
		
		if(checkQML(QMLTesto) != null)
			return true;
		else
			return false;

		//questa funzione ritorna true o false controllando sia sintassi QML che la coerenza delle risposte.
		//la sintassi QML generale viene controllata effettivamente da checkText() mentre checkAnswer fa due lavori, chiama
		// checkText() e poi fa il controllo delle risposte. 
		// checkText quindi è una funzione secondaria, la funzione principale è checkAnswer(), ma mi sa che devo cambiare i nomi 
		// per rendere la cosa più intuitiva
	}
	
});

//DEFINIZIONE ESPRESSIONI REGOLARI PER I QUATTRO TIPI DI DOMANDE:
// VF = DOMANDA VERO FALSO
// M = RISPOSTA MULTIPLA (CON UNA SOLA RISPOSTA ESATTA)
// MX = RISPOSTA MULTIPLA (CON PIÙ RISPOSTE ESATTE)
// A = DOMANDA ASSOCIAZIONE
		
var VF = /^[\s]*<question>\{(VF|vf|Vf|vF)\}[\s]*=>(.*)[\s]*\{(V|v|f|F)\}[\s]*<fine>/;
var M = /^[\s]*<question>\{(MU)\}[\s]*=>([^\{]*)[\s]*((\{(X?[\s]*)\}[\s]*(\S{1,}.*)[\s]*){2,})<fine>[\s]*/;
var MX = /^[\s]*<question>\{(MX)\}[\s]*=>([^\{]*)[\s]*((\{(X?[\s]*)\}[\s]*(\S{1,}.*)[\s]*){2,})<fine>[\s]*/
var A = /^[\s]*<question>\{(AS)\}[\s]*=>(.*\s)((([abAB])->([a-zA-Z0-9])[\s]*(\S{1,}.*)[\s]*){2,})<fine>[\s]*/;

var str; // stringa in cui viene memorizzato il testo di input compilato dall'utente
var m; // array in cui viene memorizzata la domanda scomposta secondo l'espressione regolare definita
// per capire il funzionamento della funzione exec() e quindi la variabile m risultante, basta guardare questo sito:
// https://regex101.com/ dove metti l'espressione regolare e il testo che vuoi controllare e vedi come viene suddiviso il testo.
// l'array m quindi contiene tutti i gruppi definiti dalle parentesi tonde delle espressioni regolari

function checkText(testo)
{    
	// AR è l'array che contiene le espressioni regolari definite globalmente fuori dalla funzione
    var AR = [VF, M, A, MX];
    var match = false;
    // questo ciclo controlla tramite il metodo exec() se il testo matcha
    // con una delle espressioni regolari definite dell'array AR
    for (var i = 0; i < AR.length && !match; i++)
    {
        if ((m = AR[i].exec(testo)) !== null)
        {
            match = true; 
            if (m.index === AR[i].lastIndex) 
                AR[i].lastIndex++;
        }
    }
    return match;
}

//controlla il tipo della domanda e in base a quello chiama le funzioni seguenti per controllare se c'è almeno una risposta giusta

export default function checkQML(testo)
{
    var question;
    //in pratica prima di fare il controllo sulla coerenza delle risposte controlla che 
    //la sintassi QML sia giusta. Questo è necessario in quanto con le sole espressioni regolari non
    //riesco a fare controlli ulteriori sulle risposte (cioè se per esempio una domanda a risposta multipla a più risposte giuste ha
    // almeno due risposte giuste e non una come la risposta multipla singola)
    if(checkText(testo))
    {
        switch (m[1])
        {
            case "VF":
                
                question = {
                  type: m[1],
                  text: m[2],
                  ans: checkVF()
                }; 
                break;

            case "MU":
                var answer = getRightAns();
                if(answer.length == 1) 
                {
                    question = {
                        type: m[1],
                        text: m[2],
                        ans: checkM(),
                        rightAns: getRightAnsObj() //answer
                    }; 
                }
                else 
                    window.alert("errore in checkQML");
                break;

            case "MX":
                question = {
                    type: m[1],
                    text: m[2],
                    ans: checkM(),
                    rightAns: getRightAnsObj()
                    }; 
                break;

            case "AS":
                question = {
                  type: m[1],
                  text: m[2],
                  ans: checkA()
                }; 
                break;
            default:
                window.alert("errore in checkQML");
        }
    }
    // la variabile question sarà un elemento con dei campi dipendenti dal tipo di domanda,
    // nello switch precedente si capisce che tipo di elemento viene ritornato
    if(question)
        return question;
    else
        return null;    
}

function checkVF()
{
    switch(m[3])
    {
        case ("V"):
        case ("v"):
            return true;
            
        case ("F"):
        case ("f"):
            return false;
        default:
			return "errore in checkVF";
    }
}


function checkA()
{
    var A = [],
        B = [];
    
    var re = /([abAB])->([a-zA-Z0-9])[\s]*(\S{1,}.*)/;
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
            if (s.index === re.lastIndex) 
                re.lastIndex++;
        
        window.alert(lines[i]);

        var element = [
            s[1],
            s[2],
            s[3]
        ];


        switch(element[0])
        {
            case ('A'):
                A.push(element);
                break;
            case ('B'):
                B.push(element);
                break;
                }
    }
	
    var groups = [A, B];
    return groups;
}


function checkM()
{debugger;
    var re = /{(X?[\s]*)\}[\s]*(\S{1,}.*)[\s]*/;
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

function checkMX(){
debugger;
    var re = /{(X?[\s]*)\}[\s]*(\S{1,}.*)[\s]*/;
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

function getRightAns()
{   

    var re = /\{X[\s]*\}([\s]*\S{1,}.*[\s]*)/;
    var s; 

    var lines = m[3].split('\n');

    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 

    var rAns = [];
    for (var i = 0; i < lines.length; i++)
    {
        if ((s = re.exec(lines[i])) !== null)
        {
            if (s.index === re.lastIndex) 
                re.lastIndex++;
            rAns.push(s[1]);
        }
            
    }

    return rAns;
}

function getRightAnsObj()
{   

    var re = /{(X?[\s]*)\}[\s]*(\S{1,}.*)[\s]*/;
    var s; 

    var lines = m[3].split('\n');

    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 

    var rAns={} ;// = [];
    for (var i = 0; i < lines.length; i++)
    {
        if ((s = re.exec(lines[i])) !== null)
        {
            if (s.index === re.lastIndex) 
                re.lastIndex++;
           // rAns.push(s[1]);
			if(s[1] == 'X') 
			{ rAns[i] = true; 	
			}else rAns[i] = false;  
        }
            
    }

    return rAns;
}