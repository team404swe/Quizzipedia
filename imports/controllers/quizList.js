import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizList.html';
import uiRouter from 'angular-ui-router';

class QuizListController{
	constructor($scope) {
		$scope.viewModel(this);          
	}
}

export default angular.module('quizList', [
  angularMeteor,
  uiRouter
])
  .component('quizList', {
    templateUrl: 'imports/templates/quizList.html',
    controller: ['$scope', QuizListController]
  });
