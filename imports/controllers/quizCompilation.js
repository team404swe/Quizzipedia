import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizCompilation.html';

class QuizCompilationController{
	constructor($scope) {
		$scope.viewModel(this);   
			this.testo = "Il cielo ha un colore che tende al blu.";
			this.idx= 0;
			this.prova = utente.nome;
			this.miniModel = [{
			"titolo": "Geografia"	,
			"avatar":"alarm_on",
			"tip": 	"alarm_on",
			"questions":
				[	{"tipo": "VF", "ask": "1. il puffo è blu", "ans": "V"},  				 
					{"tipo": "VF", "ask": "2. il cielo è rosso", "ans": "F"},
					{"tipo": "VF", "ask": "3. il cielo è blu",	"ans": "V"}	
				]
/*
			},
			{"titolo": "Matematica"	,
			"avatar":"alarm_off",
			"tip": 	"alarm_off",
			"questions":
				[	{"tipo": "VF", "ask": "il puffo è blu", "ans": "V"},  				 
					{"tipo": "VF", "ask": "il cielo è rosso", "ans": "F"},
					{"tipo": "VF", "ask": "il cielo è blu",	"ans": "V"}	
				]

			},
			{"titolo": "Cinema"	,
			"avatar":"alarm_off",
			"tip": 	"NO",
			"questions":
				[	{"tipo": "VF", "ask": "il puffo è blu", "ans": "V"},  				 
					{"tipo": "VF", "ask": "il cielo è rosso", "ans": "F"},
					{"tipo": "VF", "ask": "il cielo è blu",	"ans": "V"}	
				]

			},
			{"titolo": "Musica"	,
			"avatar":"alarm_on",
			"tip": 	"NO",
			"questions":
				[	{"tipo": "VF", "ask": "il puffo è blu", "ans": "V"},  				 
					{"tipo": "VF", "ask": "il cielo è rosso", "ans": "F"},
					{"tipo": "VF", "ask": "il cielo è blu",	"ans": "V"}	
				]

			},
			{"titolo": "Sport"	,
			"avatar":"alarm_on",
			"tip": 	"NO",
			"questions":
				[	{"tipo": "VF", "ask": "il puffo è blu", "ans": "V"},  				 
					{"tipo": "VF", "ask": "il cielo è rosso", "ans": "F"},
					{"tipo": "VF", "ask": "il cielo è blu",	"ans": "V"}	
				]
*/
			}]; 
			
			
	}
	goback(lista){
		
			//	var attr = idx + 1;
				//if( attr < lista.length )
			//	{
					this.idx = this.idx + 1;
			//	}else idx = 0;
			}
	gonext(lista){
				var attr = this.idx + 1;
				if( attr < lista.length )
				{
					this.idx = this.idx + 1;
				}else this.idx = 0;
			}		
} 

export default angular.module('quizCompilation', [
  angularMeteor
])
  .component('quizCompilation', {
    templateUrl: 'imports/templates/quizCompilation.html',
    controller: ['$scope', QuizCompilationController]
  });
