import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizList.html';

class QuizListController{
	constructor($scope) {
		$scope.viewModel(this);          
	}
}

export default angular.module('quizList', [
  angularMeteor
])
  .component('quizList', {
    templateUrl: 'imports/templates/quizList.html',
    controller: ['$scope', QuizListController]
  });
