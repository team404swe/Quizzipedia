import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizCompilation.html';


class QuizCompilationController{
	constructor($scope,$interval) {
		$scope.viewModel(this);  
			this.quizPlay = false; 
			this.punti=0;
			this.idx= 0;
			this.pageTime = undefined;
			this.helpers({
			'wTime' : function() {return QzTimer.tempo; }					
		});	
			this.myClock = {tempo:150000, format: 'mm:ss', timerID: undefined,
				CheckTimee: function()
				{  debugger;	
					if(QzTimer.tempo === 0)
					{
						Meteor.clearInterval(QzTimer.timerID);
					}
					else{ 
							if(QzTimer.quizPlay) QzTimer.tempo = QzTimer.tempo - 1000; $scope.$apply() ;
							//else  Meteor.clearInterval(QzTimer.timerID);
							}
				}  
			};
			this.link = "qzcustom/p1.gif";
			this.myQuiz = [];
			this.miniModel = {
			_id:"test",
			title: "Patente"	,
			descrizione:"Questo quiz di prova simula la prova teorica proposta all'esame per il conseguimento della patente",
			time: 10000,
			questions:
				[	{_id:"1", type: "VF", image:"qzcustom/p9.gif", text: "La striscia bianca laterale discontinua in figura divide la carreggiata da una corsia di accelerazione", ans:true}	,
					{_id:"2", type: "VF", image:"qzcustom/p6.gif", text: "Il segnale raffigurato obbliga a rallentare per essere pronti a fermarsi in caso di segnalazione da parte degli agenti",	ans:false}	,
					{_id:"3", type: "MU", image:"qzcustom/p7.gif", text: "Il segnale raffigurato indica una curva ",	rightAns:2,
					risp:undefined, ans:[{testo:"in discesa",id:1},{testo:"gaussiana",id:3},{testo:"sapiente",id:4},{testo:"nessuna delle precedenti",id:2}] }	,
					
					{_id:"6", type: "MX", text: "chi ha scoperto l'aria fritta",risp:undefined , rightAns:{1:false,2:true,3:false,4:true},
					ans:[{testo:"pippo",id:1},{testo:"pluto",id:3},{testo:"Mario",id:4},{testo:"Chuck",id:2}] } ,
					
					{_id:"4", type: "AS", text: "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è a luce verde e l'agente del traffico ci ordina di fermarci",	
					ans: {a:[{testo:"banana",id:3,risp:""},{testo:"fragola",id:5,risp:""}],b:[{testo:"giallo",id:3},{testo:"viola",id:1},{testo:"rosso",id:5}]},
					rightAns:{3:"3",5:"5"}, risp:{}					}	,
					
					{_id:"5", type: "OD", image:"qzcustom/p9.gif", text: "Ordina i paesi per superficie più grande ", rightAns:{1:"2",2:"3",3:"7",4:"11" },
					ans:[ {id:7 , testo:"Italia" },{id:2 , testo:"Spagna"},{id:11 , testo:"Regno Unito" },{id:3 , testo:"Polonia" }]  }	
				]

			};
			
			this.setQuiz();
			
		/*	
		Meteor.call("", QMLtext, function(error, result) {
				if (error)
					QzMessage.showText(0, error);
				else{
					console.log(result);
					if(result)
						QzMessage.showText(2, "QML syntax is valid");
					else
						QzMessage.showText(1, "QML text has sintax errors");
				}
			});
		*/
		
	}
	
	activeSelect(){
		
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
	{ 
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
	setQuiz()
	{
		if ( quizComp !== undefined )
		{
		debugger;
			this.miniModel = quizComp;
			QzTimer.tempo = this.miniModel.time * 60000;
			QzTimer.timerID = Meteor.setInterval(this.CheckTime,1000);
			myTimer = QzTimer.tempo;
			this.pageTime = QzTimer;
		}		
	}
	CheckTime()
				{ // debugger;	
					if(QzTimer.tempo === 0)
					{
						Meteor.clearInterval(QzTimer.timerID);
					}
					else{ 
							if(QzTimer.quizPlay) QzTimer.tempo = QzTimer.tempo - 1000; var element = angular.element($('#viewTimer'));
element.scope().$apply();;
							//else  Meteor.clearInterval(QzTimer.timerID);
							}
				}
	startQuiz()
	{	
		this.quizPlay = true;
		QzTimer.quizPlay = true;
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
	{	
		switch (this.myQuiz[this.idx].type)
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
			this.myQuiz[this.idx].risp = true;
		}
		else
		{
			this.myQuiz[this.idx].risp = false;
		}
	}
	setAnswerMU(rispoMU)
	{	
		this.myQuiz[this.idx].risp = rispoMU;
	}
	
	contaPunti()
	{ 	var conta = 0;
		for(var i = 0; i < this.myQuiz.length; i++)
		{	
			if (this.myQuiz[i].type === "VF")
			{	if(this.myQuiz[i].ans === this.myQuiz[i].risp)
				{
					conta += 1; 
				}
				
			}
			else if (this.myQuiz[i].type === "MU")
			{	if(this.myQuiz[i].rightAns == this.myQuiz[i].risp )
				{
					conta += 1; 
				}
				
			}
			else if (this.myQuiz[i].type === "MX")
			{	var sentinella = true;
				var lo_quiz = this.myQuiz[i];
				var lo_ans = lo_quiz.ans;
				if(lo_quiz.risp !== undefined)
				{				
					for(var j = 0; j < lo_ans.length; j++)
					{	
						if(  lo_quiz.risp[lo_ans[j].id] === undefined )
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
			}
			else if (this.myQuiz[i].type === "AS")
			{
				if ( angular.equals( this.myQuiz[i].rightAns , this.myQuiz[i].risp ) )
				{
					conta += 1;
				}
			}
			else if (this.myQuiz[i].type === "OD")
			{
				if ( angular.equals( this.myQuiz[i].rightAns , this.myQuiz[i].risp ) )
				{
					conta += 1;
				}
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
    controller: ['$scope','$interval', QuizCompilationController]
  });
 