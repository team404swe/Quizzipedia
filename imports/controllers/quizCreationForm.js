import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/quizCreationForm.html';

import { Questions } from '../publishers/questionPublisher.js';

class NewQuizController{
	constructor($scope) {
		$scope.viewModel(this);     
				
		//JQuery per caricare correttamente la select
		$(document).ready(function() {
			$('select').material_select();
		});
		
		this.questions = [];	
		this.categories= [];
				
		this.subscribe('questions');
		   
		this.helpers({
			questionList() {
				return Questions.find({}, {"sort" : [['createdAt', 'desc']]});
			}
		});   
	}
	
	toggleSelection(question){		
		var idpos= this.questions.indexOf(question._id);
		if(idpos > -1){
			this.questions.splice(idpos,1);
			var categoryPos= this.categories.indexOf(question.category);
			if(categoryPos > -1){
				this.categories.splice(categoryPos,1);
			}
		}
		else{
			this.questions.push(question._id);
			this.categories.push(question.category);
		}
	}
	
	saveQuiz(title, questions, categories, time){			
		
		if(title==undefined || questions==undefined || categories==undefined || time==undefined ){
			QzMessage.showText(0, "Please fill all the form data and select at least a question");
		}
		else{
			Meteor.call("quizzes.insert", title, questions, categories, time);
			QzMessage.showText(2,'quiz inserito');		
		}
	}
}

export default angular.module('quizCreationForm', [
  angularMeteor
])
  .component('quizCreationForm', {
    templateUrl: 'imports/templates/quizCreationForm.html',    
    controller: ['$scope', NewQuizController]
  });
  
