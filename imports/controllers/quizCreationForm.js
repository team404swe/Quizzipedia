import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizCreationForm.html';

class NewQuizController{
	constructor($scope) {
		$scope.viewModel(this);     
				
		//JQuery per caricare correttamente la select
		$(document).ready(function() {
			$('select').material_select();
		});      
	}
	
	saveQuiz(newQuiz){
		
	}
}

export default angular.module('quizCreationForm', [
  angularMeteor
])
  .component('quizCreationForm', {
    templateUrl: 'imports/templates/quizCreationForm.html',
    controller: ['$scope', NewQuizController]
  });
  
