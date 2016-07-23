import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/questionList.html';
import Question from './question';

import { Questions } from '../publishers/questionPublisher.js';
import checkQML from '../parser/Parser.js'

class QuestionListController{
	constructor($scope) {
		$scope.viewModel(this);     
		
		/*Materilize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : true 
			});
		});      
		
		this.subscribe('questions');
	
		this.helpers({
			questions() {
				return Questions.find({}, {"sort" : [['createdAt', 'desc']]});
			}					
		});		
	}
	
	getQuestionDetails(QMLtext){		
		var question = checkQML(QMLtext);
		if(question)
			return question;
		else
			console.log("Error retrieving question details");
	}		
	
}

export default angular.module('questionList', [
  angularMeteor,  
  Question.name
])
  .component('questionList', {
    templateUrl: 'imports/templates/questionList.html',        
    controller: ['$scope', QuestionListController]
  });
