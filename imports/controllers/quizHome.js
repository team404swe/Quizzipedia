import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizHome.html';

class QuizHomeController{
	constructor($scope) {
		$scope.viewModel(this); 
		
		this.helpers({
			isLoggedIn(){
				return !!Meteor.userId();
			}
		});         
	}	
	
}

export default angular.module('quizHome', [
  angularMeteor
])
  .component('quizHome', {
    templateUrl: 'imports/templates/quizHome.html',
    controller: ['$scope', QuizHomeController]
  });
