import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/questionList.html';
import Question from './question';
import { Meteor } from 'meteor/meteor'

import { Questions } from '../publishers/questionPublisher.js';
import checkQML from '../parser/Parser.js';

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
				return Questions.find({"owner" : Meteor.userId()}, {"sort" : [['createdAt', 'desc']]});
			}					
		});		
	}
	
	getQuestionDetails(QMLtext){		
		var questionDetails = checkQML(QMLtext);
		if(questionDetails)
			return questionDetails;
		else
			console.log("Error retrieving question details");
	}		
	
	deleteQuestion(question){
		if(question){
			console.log(question);
			Meteor.call("questions.remove", question, function(error, result) {
				if (error)
					QzMessage.showText(0, error);
				else
					console.log(result);
					if(result)
					{
						QzMessage.showText(2, "Your question has been removed!");
					}
					else
						QzMessage.showText(0, "Can't remove question");											
			});
		}
		else{
			console.log("Error removing question");
		}
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
