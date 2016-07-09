import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/questionList.html';
import Question from './question';

import { Questions } from '../publishers/questionPublisher.js';

class QuestionListController{
	constructor($scope) {
		$scope.viewModel(this);          
		
		this.subscribe('questions');
	
		this.helpers({
			questions() {
				return Questions.find();
			}
		});
	}
	
}

export default angular.module('questionList', [
  angularMeteor,  
  Question.name
])
  .component('questionList', {
    templateUrl: 'imports/templates/questionList.html',    
    controllerAs: 'questionList',
    controller: ['$scope', QuestionListController]
  });
