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
			"titolo": "Patente"	,
			descrizione:"Questo quiz di prova simula la prova teorica proposta all'esame per il conseguimento della patente",
			"tempo": 	"alarm_on",
			"questions":
				[	{_id:"1", tipo: "VF", image:"qzcustom/p1.gif", ask: "Il Segnale raffigurato presegnala un tratto di strada deformata", ans: "V"},  				 
					{_id:"2", tipo: "VF", image:"qzcustom/p1.gif", ask: "Entrati in un centro abitato, bisogna tenere conto che gli altri utenti della strada (quali pedoni e ciclisti) si mescolano maggiormente con il traffico motorizzato", ans: "F"},
					{_id:"3", tipo: "VF", image:"qzcustom/p3.gif", ask: "In presenza del segnale raffigurato il sorpasso del tram è consentito solo a destra",	ans: "V"},
					{_id:"4", tipo: "VF", image:"qzcustom/p4.gif", ask: "Il segnale raffigurato vieta il transito degli autoveicoli di lunghezza superiore a 3,50 metri",	ans: "V"}	,
					{_id:"5", tipo: "VF", image:"qzcustom/p5.gif", ask: "Il segnale raffigurato vieta di superare la velocità di 50 km/h",	ans: "V"}	,
					{_id:"9", tipo: "VF", image:"qzcustom/p9.gif", ask: "La striscia bianca laterale discontinua in figura divide la carreggiata da una corsia di accelerazione",	ans: "V"}	,
					{_id:"6", tipo: "VF", image:"qzcustom/p6.gif", ask: "Il segnale raffigurato obbliga a rallentare per essere pronti a fermarsi in caso di segnalazione da parte degli agenti",	ans: "V"}	,
					{_id:"7", tipo: "MX", image:"qzcustom/p7.gif", ask: "Il segnale raffigurato indica una curva pericolosa a destra",	ans: "V"}	,
					{_id:"8", tipo: "AS", image:"qzcustom/p8.gif", ask: "In presenza del segnale raffigurato e del semaforo a tre luci abbiamo la precedenza se il semaforo è a luce verde e l'agente del traffico ci ordina di fermarci",	ans: "V"}	,
					{_id:"9", tipo: "OD", image:"qzcustom/p9.gif", ask: "La striscia bianca laterale discontinua in figura divide la carreggiata da una corsia di accelerazione",	ans: "V"}	,
					{_id:"9", tipo: "MU", ask: "chi ha scoperto l'aria fritta", ans:[{risp:"",testo:"pippo"},{risp:"",testo:"pluto"},{risp:"",testo:"paperino"},{risp:"X",testo:"Chuck"}] }
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
	
	startQuiz()
	{	
		this.quizPlay = true;
		this.myQuiz = miniModel.questions;
	}
	
	
	prevQuestion(lista)
	{
		
			
			//	var attr = idx + 1;
				//if( attr < lista.length )
			//	{
					this.idx = this.idx + 1;
			//	}else idx = 0;
			this.link = lista[this.idx].image;
			}
	nextQuestion(lista){
				var attr = this.idx + 1;
				if( attr < lista.length )
				{
					this.idx = this.idx + 1;
				}else this.idx = 0;
				this.link = lista[this.idx].image;
			}
			
	goIndex(indice){
		this.idx = indice;
		
	}
	
	submitQuiz(){
		
		QzMessage.showAlert();
		
	}
} 

export default angular.module('quizCompilation', [
  angularMeteor
])
  .component('quizCompilation', {
    templateUrl: 'imports/templates/quizCompilation.html',
    controller: ['$scope', QuizCompilationController]
  });
