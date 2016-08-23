import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizResults.html';

class quizResultsController{
	constructor($scope) {
		$scope.viewModel(this);    
		debugger;
		this.punti = QzFine.QzPunti;
		this.quizObj = quizComp;
		this.jsonQuiz = angular.toJson(quizComp);
	}
	
	getQuiz(){
		debugger;
		this.quizObj = quizComp;
	}
	
	log(question){
		console.log(question);
	}
	
	getFullQuestionType(shortType){
		var fullType;
		switch(shortType){
			case "VF":
				fullType = "Vero o Falso";
				break;
			case "MU":
				fullType = "Risposta multipla (unica risposta esatta)";
				break;
			case "MX":
				fullType = "Risposta multipla (più risposte esatte)";
				break;
			case "AS":
				fullType = "Associazione";
				break;
			case "OD":
				fullType = "Ordinamento";
				break;
			default:
				fullType =shortType;
				break;
		}
		return fullType;
	}
}

export default angular.module('quizResults', [
  angularMeteor
])
  .component('quizResults', {
    templateUrl: 'imports/templates/quizResults.html',
    controller: ['$scope', quizResultsController]
  });
