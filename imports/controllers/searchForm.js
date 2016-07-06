import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/searchForm.html';

class SearchFormController{
	constructor($scope) {
		
		$scope.viewModel(this);    
		this.Risultati = [];
		this.searchQuiz = true;
		this.searchQuestion = false;
		this.searchFilter = false;
		this.resultModel = [{
			"titolo": "Geografia"	,
			"avatar":"alarm_on",
			"tip": 	"alarm_on",
			"questions":
				[	{"tipo": "VF", "ask": "il puffo è blu", "ans": "V"},  				 
					{"tipo": "VF", "ask": "il cielo è rosso", "ans": "F"},
					{"tipo": "VF", "ask": "il cielo è blu",	"ans": "V"}	
				]

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

			}]; 
		}
		showDetails()
		{
			var ret ;

		}
	
	
	cerca(){
		debugger;

    this.searchPatt = 'Bingo!';
    this.searchQuiz = true;

    this.Risultati = ["Architettura", "Matematica", "Fisica", "Informatica", "Psicologia", "Medicina"];

  	}
  	pulisci(){
  	this.searchPatt = '';
  }
  	mostra(idSearch){

  	}
}

export default angular.module('searchForm', [
  angularMeteor
])
  .component('searchForm', {
    templateUrl: 'imports/templates/searchForm.html',
    //controllerAs: 'searchForm'
    controller: ['$scope', SearchFormController]
  });
  
