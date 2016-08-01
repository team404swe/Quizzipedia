import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizResults.html';

class quizResultsController{
	constructor($scope) {
		$scope.viewModel(this);    
		debugger;
		this.punti = QzFine.QzPunti;
	}
}

export default angular.module('quizResults', [
  angularMeteor
])
  .component('quizResults', {
    templateUrl: 'imports/templates/quizResults.html',
    controller: ['$scope', quizResultsController]
  });
