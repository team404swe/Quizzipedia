import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quiz.html';

class QuizController{
	constructor($scope) {
		$scope.viewModel(this);          
	}
}

export default angular.module('quiz', [
  angularMeteor
])
  .component('quiz', {
    templateUrl: 'imports/templates/question.html',
    controller: ['$scope', QuizController]
  });
