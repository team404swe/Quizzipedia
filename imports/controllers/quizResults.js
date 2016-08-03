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
}

export default angular.module('quizResults', [
  angularMeteor
])
  .component('quizResults', {
    templateUrl: 'imports/templates/quizResults.html',
    controller: ['$scope', quizResultsController]
  });
