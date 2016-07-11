import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizList.html';

import { Quizzes } from '../publishers/quizPublisher.js';

class QuizListController{
	constructor($scope) {
		$scope.viewModel(this);     
		
		/*Materilize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : true 
			});
		});     
		
		this.subscribe('quizzes');
	
		this.helpers({
			quizzes(){
				return Quizzes.find({}, {"sort" : [['createdAt', 'desc']]});
			}
		});
	}
}

export default angular.module('quizList', [
  angularMeteor,  
])
  .component('quizList', {
    templateUrl: 'imports/templates/quizList.html',
    controller: ['$scope', QuizListController]
  });
