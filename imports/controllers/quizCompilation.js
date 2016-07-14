import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizCompilation.html';

class QuizCompilationController{
	constructor($scope) {
		$scope.viewModel(this);   
			this.testo = "Il cielo ha un colore che tende al blu.";
			this.idx= 0;
			this.link = "qzcustom/p1.gif";
			this.prova = utente.nome;
			this.quizplay = false;
			this.myQuiz = {};
			this.miniModel = [{
			titolo: "Patente"	,
			descrizione:"Questo quiz di prova simula la prova teorica proposta all'esame per il conseguimento della patente",
			tempo: 	"alarm_on",
			questions:
				[	{_id:"1", tipo: "VF", image:"qzcustom/p9.gif", ask: "La striscia bianca laterale discontinua in figura divide la carreggiata da una corsia di accelerazione", ans:"V"}	,
					{_id:"2", tipo: "VF", image:"qzcustom/p6.gif", ask: "Il segnale raffigurato obbliga a rallentare per essere pronti a fermarsi in caso di segnalazione da parte degli agenti",	ans:"F"}	,
					{_id:"3", tipo: "MX", image:"qzcustom/p7.gif", ask: "Il segnale raffigurato indica una curva ",	
					risp:{ }, ans:[{testo:"in discesa",id:1},{testo:"gaussiana",id:3},{testo:"sapiente",id:4},{testo:"nessuna delle precedenti",id:2}] }	,
					
					{_id:"4", tipo: "AS", image:"qzcustom/p8.gif", ask: "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è a luce verde e l'agente del traffico ci ordina di fermarci",	
					ans: {a:[{testo:"banana",id:3,risp:""},{testo:"fragola",id:5,risp:""}],b:[{testo:"giallo",id:3},{testo:"viola",id:1},{testo:"rosso",id:5}]} }	,
					
					{_id:"5", tipo: "OD", image:"qzcustom/p9.gif", ask: "La striscia bianca laterale discontinua in figura divide la carreggiata da una corsia di accelerazione",	ans: "V"}	,
					{_id:"6", tipo: "MU", ask: "chi ha scoperto l'aria fritta",risp:"" ,ans:[{testo:"pippo",id:1},{testo:"pluto",id:3},{testo:"paperino",id:4},{testo:"Chuck",id:2}] }
				]

			}]; 
			
		
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
		for(var i = 0; i < this.miniModel[0].questions.length; i++)
		{	
			if(i === this.idx){
				this.miniModel[0].questions[i].nClass = "active";
			}
			else
			{
				this.miniModel[0].questions[i].nClass = "";
			} 
		}
	}
	startQuiz()
	{	
		this.quizPlay = true;
		this.myQuiz = miniModel.questions;
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
		
		QzMessage.showAlert();
		
	}
	setAnswer(rispo)
	{	debugger;
		switch (this.miniModel[0].questions[this.idx].tipo)
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
			this.miniModel[0].questions[this.idx].risp = "V";
		}
		else
		{
			this.miniModel[0].questions[this.idx].risp = "F";
		}
	}
	setAnswerMU(rispoMU)
	{	debugger;
		this.miniModel[0].questions[this.idx].risp = rispoMU;
	}
} 

export default angular.module('quizCompilation', [
  angularMeteor
])
  .component('quizCompilation', {
    templateUrl: 'imports/templates/quizCompilation.html',
    controller: ['$scope', QuizCompilationController]
  });
 