import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/userProfile.html';
import questionList from '../controllers/questionList';
import quizList from '../controllers/quizList';

class UserProfileController{
	constructor($scope) {
		$scope.viewModel(this);     
		
		/*Materilize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : true 
			});
		});     		
	}
}

export default angular.module('userProfile', [
  angularMeteor,
  questionList.name,
  quizList.name
])
  .component('userProfile', {
    templateUrl: 'imports/templates/userProfile.html',
    controller: ['$scope', UserProfileController]
  });
