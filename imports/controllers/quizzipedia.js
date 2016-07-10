import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from '../templates/quizzipedia.html';
import topbar from '../controllers/topbar';
import navbar from '../controllers/navbar';
import quizList from '../controllers/quizList';
import questionList from '../controllers/questionList';
import quizCreationForm from '../controllers/quizCreationForm';
import questionForm from '../controllers/questionForm';
import searchForm from '../controllers/searchForm';
import quizCompilation from '../controllers/quizCompilation';

uteto = 'tetipo';
utente ={nome:'Tino', cognome:'MBO'};

class Quizzipedia {
	constructor($scope){
		debugger;
		$scope.viewModel(this);		
		
		//attivazione del menu mobile
		$(".button-collapse").sideNav();
	}	
	
	
}

 cambia = function(){
	 debugger;
	 utente.nome = 'cambiato';
	 utente.cognome = 'FATTO!';
	 teto = 'finemondo';
 };
 quizComp = function(){ 
			alert('GLOBAL FUNCTION');
			}
 
QzMessage = {
	msgTipo : ['error','warning','success'],
	showAlert(msg){
		this.showText(0,msg);
		
		
	} ,
	showText(tipo,msg){	
		var msgTip = ['error','warning','success'];		
		var msgClass = "alert "+msgTip[tipo]; 	
		
		Materialize.toast(msg, 5000, msgClass);		
				
	}
 }
 

// create a module
export default angular.module('quizzipedia', [
  angularMeteor,
  uiRouter,
  topbar.name,
  navbar.name,
  quizList.name,
  questionList.name,
  quizCreationForm.name,
  questionForm.name,
  searchForm.name,
  quizCompilation.name,
  'accounts.ui'
]).component('quizzipedia', {
  templateUrl: 'imports/templates/quizzipedia.html',  
  controllerAs: 'quizzipedia',
  controller: [ '$scope' , Quizzipedia ]
})
	.config(config);
 
	function config($locationProvider, $urlRouterProvider, $stateProvider) {		
	 
		$locationProvider.html5Mode(true);
	 
		$urlRouterProvider.otherwise('/');
	  
		$stateProvider.state('quizlist', {
						url: '/quizlist',
						template: '<quiz-list></quiz-list>'
		});
		$stateProvider.state('questionlist', {
						url: '/questionlist',
						template: '<question-list></question-list>'
		});
		$stateProvider.state('quizCreationForm', {
						url: '/quizCreationForm',
						template: '<quiz-creation-form></quiz-creation-form>'
		});
		$stateProvider.state('questionForm', {
						url: '/questionForm',
						template: '<question-form></question-form>'
		});
		$stateProvider.state('searchForm', {
						url: '/searchForm',
						template: '<search-form></search-form>'
		});
		$stateProvider.state('quizCompilation', {
						url: '/quizCompilation',
						template: '<quiz-Compilation></quiz-Compilation>'
		});
	}

/***********************************************************/
/******** INSERIMENTO FUNZIONI PARSER E INTERPRETER ********/
/***********************************************************/

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
var m; // array in cui viene memorizzata la domanda scomposta

//ritorna true se trova il match completo (senza controllare se esiste almeno una risposta giusta)
// il controllo della presenza della risposta giusta è fatto dalla funzione checkAnswer()

checkText = function(str)
{	debugger;
    
   // str = document.getElementById("inputText").value;
    
    var AR = [VF, M, A, MX];
    var match = false;

    for (var i = 0; i < AR.length && !match; i++)
    {
        if ((m = AR[i].exec(str)) !== null)
        {
            match = true; 
            if (m.index === AR[i].lastIndex) 
                AR[i].lastIndex++;
        }
    }

    if(m)
	{
        window.alert("domanda di tipo:\n"+m[1]);
		return "domanda di tipo: " + m[1];
    }
	else 
	{	
        window.alert("codice non corretto");  
		return match;
	}
}

//controlla il tipo della domanda e in base a quello chiama le funzioni seguenti per controllare se c'è almeno una risposta giusta

 checkAnswer = function()
{
    var question;
    if(checkText())
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
                        rightAns: answer
                    }; 
                }
                else 
                    window.alert("errore in checkAnswer");
                break;

            case "MX":
                question = {
                    type: m[1],
                    text: m[2],
                    ans: checkM(),
                    rightAns: getRightAns()
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
                window.alert("errore in checkAnswer");
        }
    }

    if(question)
    {
        //window.alert(question.type + "\n" + question.text + "\n" + question.ans + "\n" + question.rightAns);
        document.getElementById('tipo').innerHTML += question.type;
        document.getElementById('testo').innerHTML +=  question.text;
        document.getElementById('lista').innerHTML += question.ans;
        document.getElementById('giusta').innerHTML += question.rightAns;
        return question;
    }
    else
        return null;    
}

// ritorna true o false in base alla risposta se è V o F
 checkVF = function()
{
    switch(m[3])
    {
        case ("V"):
        case ("v"):
            //window.alert("risposta vera");
            return true;
            
        case ("F"):
        case ("f"):
            //window.alert("risposta falsa");
            return false;
        default:
            window.alert("errore in checkVF");
    }
}


 checkA = function()
{
    var A = [], // elementi del gruppo A
        B = []; // elementi del gruppo B
    
    var re = /([abAB])->([a-zA-Z0-9])[\s]*(\S{1,}.*)/;
    var s;

    var lines = m[3].split('\n');
    //var prova = "risposte: ";
    
    /*for(var i = 0; i < lines.length; i++)
    {
        prova = prova + lines[i];
    }*/
    //window.alert(lines[3]);
    var j = 0; 
    for (var i = 0; i < lines.length; i++) {
        if(lines[i] == null)
            j = i; 
    }
    lines.pop(j); 

    //window.alert("quantita righe: "+lines.length);

    for (var i = 0; i < lines.length; i++)
    {
        if ((s = re.exec(lines[i])) !== null)
            if (s.index === re.lastIndex) 
                re.lastIndex++;
        
        window.alert(lines[i]);

        var element = [
            s[1],   //nome gruppo
            s[2],   //numero elemento
            s[3]    //testo
        ];

        //window.alert(element.group);

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

     // for (var i = 0; i < A.length; i++)
     // {
     // window.alert(A[i].text);
     // }      
     // for (var i = 0; i < B.length; i++)
     // {
     //     window.alert(B[i].text);
     // }    
    var groups = [A, B];
    return groups;
}


 checkM = function()
{
    var re = /((\{X?[\s]*\}[\s]*\S{1,}.*[\s]*){2,})/;
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
        //window.alert(lines[i]);
        if ((s = re.exec(lines[i])) !== null)
            if (s.index === re.lastIndex) 
                re.lastIndex++;

    }
    return lines;

}

 checkMX = function(){

    var re = /((\{X?[\s]*\}[\s]*\S{1,}.*[\s]*){2,})/;
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
        //window.alert(lines[i]);
        if ((s = re.exec(lines[i])) !== null)
            if (s.index === re.lastIndex) 
                re.lastIndex++;

    }
    return lines;
}

 getRightAns = function()
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
    //window.alert(lines);

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

    window.alert("risposta giusta: " + rAns);
    return rAns;
}


// EOF


