import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizCompilation.html';

class QuizCompilationController{
	constructor($scope) {
		$scope.viewModel(this);   
			this.punti=0;
			this.idx= 0;
			this.link = "qzcustom/p1.gif";
			this.quizPlay = false;
			this.myQuiz = [];
			this.miniModel = {
			titolo: "Patente"	,
			descrizione:"Questo quiz di prova simula la prova teorica proposta all'esame per il conseguimento della patente",
			tempo: 	"alarm_on",
			questions:
				[	{_id:"1", tipo: "VF", image:"qzcustom/p9.gif", ask: "La striscia bianca laterale discontinua in figura divide la carreggiata da una corsia di accelerazione", ans:"V"}	,
					{_id:"2", tipo: "VF", image:"qzcustom/p6.gif", ask: "Il segnale raffigurato obbliga a rallentare per essere pronti a fermarsi in caso di segnalazione da parte degli agenti",	ans:"F"}	,
					{_id:"3", tipo: "MU", image:"qzcustom/p7.gif", ask: "Il segnale raffigurato indica una curva ",	rightAns:2,
					risp:undefined, ans:[{testo:"in discesa",id:1},{testo:"gaussiana",id:3},{testo:"sapiente",id:4},{testo:"nessuna delle precedenti",id:2}] }	,
					
					{_id:"6", tipo: "MX", ask: "chi ha scoperto l'aria fritta",risp:undefined , rightAns:{1:false,2:true,3:false,4:true},
					ans:[{testo:"pippo",id:1},{testo:"pluto",id:3},{testo:"Mario",id:4},{testo:"Chuck",id:2}] } ,
					
					{_id:"4", tipo: "AS", ask: "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è a luce verde e l'agente del traffico ci ordina di fermarci",	
					ans: {a:[{testo:"banana",id:3,risp:""},{testo:"fragola",id:5,risp:""}],b:[{testo:"giallo",id:3},{testo:"viola",id:1},{testo:"rosso",id:5}]},
					rightAns:{1:1,3:3,5:5}, risp:{}					}	,
					
					{_id:"5", tipo: "OD", image:"qzcustom/p9.gif", ask: "Ordina i paesi per superficie più grande ",	
					ans:[ {id:7 , testo:"Italia" },{id:2 , testo:"Spagna"},{id:11 , testo:"Regno Unito" },{id:3 , testo:"Polonia" }]  }	
				]

			};
			
			

		
	}
	
	activeSelect(){
		debugger;
		//JQuery per caricare correttamente la select
		$(document).ready(function() {
			$('select').material_select();
		}); 
	}
	activeModal()
	{		
		$('#modal1').openModal();
	}
	setClass()
	{ debugger;
		for(var i = 0; i < this.myQuiz.length; i++)
		{	
			if(i === this.idx){
				this.myQuiz[i].nClass = "active";
			}
			else
			{
				this.myQuiz[i].nClass = "";
			} 
		}
	}
	startQuiz()
	{	
		this.quizPlay = true;
		this.myQuiz = this.miniModel.questions;
		this.goIndex(0);
	}
	
	
	prevQuestion(lista)
	{			
		if( this.idx > 0 )
		{
			this.idx = this.idx - 1;
		}
		else
		{ 
			this.idx = lista.length - 1;
		}
		this.link = lista[this.idx].image;
		this.setClass();
	}
	nextQuestion(lista)
	{
		var attr = this.idx + 1;
		if( attr < lista.length )
		{
			this.idx = this.idx + 1;
		}
		else 
		{	
			this.idx = 0;
		}
		this.link = lista[this.idx].image;
		this.setClass();
	}
		
	goIndex(indice){
		this.idx = indice;	
		this.setClass();
	}
	goBack()
	{
		window.history.back();
	}
	
	submitQuiz(){		
	
		this.punti = this.contaPunti();
		QzMessage.showText(2, "Punteggio attuale: " + this.punti);
	}
	setAnswer(rispo)
	{	debugger;
		switch (this.myQuiz[this.idx].tipo)
        {
            case "VF": 
				this.setAnswerVF(rispo);                
                break;			
            case "MU":            
                this.setAnswerMU(rispo); 
                break;
			case "MX":
				this.setAnswerMX(rispo);                
                break;
			case "AS":
				this.setAnswerAS(rispo);                
                break;
			case "OD":
				this.setAnswerOD(rispo);                
                break;
		}	
		
	}
	setAnswerVF(rispoVF)
	{	
		if(rispoVF)
		{ 
			this.myQuiz[this.idx].risp = "V";
		}
		else
		{
			this.myQuiz[this.idx].risp = "F";
		}
	}
	setAnswerMU(rispoMU)
	{	debugger;
		this.myQuiz[this.idx].risp = rispoMU;
	}
	
	contaPunti()
	{ 	var conta = 0;
		for(var i = 0; i < this.myQuiz.length; i++)
		{	
			if (this.myQuiz[i].tipo === "VF")
			{	if(this.myQuiz[i].ans === this.myQuiz[i].risp)
				{
					conta += 1; 
				}
				
			}
			else if (this.myQuiz[i].tipo === "MU")
			{	if(this.myQuiz[i].rightAns == this.myQuiz[i].risp )
				{
					conta += 1; 
				}
				
			}
			else if (this.myQuiz[i].tipo === "MX")
			{	var sentinella = true;
				var lo_quiz = this.myQuiz[i];
				var lo_ans = lo_quiz.ans;
				for(var j = 0; j < lo_ans.length; j++)
				{	if( lo_quiz.risp[lo_ans[j].id] === undefined )
					{
						lo_quiz.risp[lo_ans[j].id] = false;
					}
					if( lo_quiz.rightAns[lo_ans[j].id] !== lo_quiz.risp[lo_ans[j].id] )
					{
						sentinella = false;
					}
				}
				if( sentinella === true ){ conta += 1;}
				
			}
			else if (this.myQuiz[i].tipo === "AS")
			{
				
			}
			else if (this.myQuiz[i].tipo === "OD")
			{
				
			}
			
		}	
		return conta;
		
	}
	
} 

export default angular.module('quizCompilation', [
  angularMeteor
])
  .component('quizCompilation', {
    templateUrl: 'imports/templates/quizCompilation.html',
    controller: ['$scope', QuizCompilationController]
  });
 