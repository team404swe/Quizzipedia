import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizStatistics.html';

class QuizStatisticsController{
	constructor($scope) {
		$scope.viewModel(this);          
	}
}

export default angular.module('quizStatistics', [
  angularMeteor
])
  .component('quizStatistics', {
    templateUrl: 'imports/templates/quizStatistics.html',
    controller: ['$scope', QuizStatisticsController]
  });
