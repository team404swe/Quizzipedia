import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/quizCreationForm.html';

import { Questions } from '../publishers/questionPublisher.js';

class NewQuizController{
	constructor($scope) {
		$scope.viewModel(this);     						
		
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
			var categoryPos = this.categories.map(function(c) {return c.category; }).indexOf(question.category); 			
			
			if(categoryPos > -1){
				if(this.categories[categoryPos].counter > 1){
					this.categories[categoryPos].counter--;
				}
				else{
					this.categories.splice(categoryPos,1);
				}
			}
		}
		else{
			this.questions.push(question._id);
			var categoryPos = this.categories.map(function(c) {return c.category; }).indexOf(question.category); 			
			if(categoryPos == -1){
				this.categories.push({category: question.category, counter: 1});				
			}
			else{
				this.categories[categoryPos].counter++;
			}
		}
	}
	
	saveQuiz(title, questions, categories, time){			
		
		if(title==undefined || time==undefined ){
			QzMessage.showText(0, "Please fill all the form data");
		}
		else if(questions.length == 0 || categories.length==0){
			QzMessage.showText(0, "Select at least a question and a category");
		}
		else{
			categories=  this.categories.map(function(item){ return item.category});
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
  
  
  /*toggleSelection(question){		
		var idpos= this.questions.indexOf(question._id);
		if(idpos > -1){
			this.questions.splice(idpos,1);
			this.categories.forEach(function(item, index){
				if(item.category == question.category && item.counter >1 ){
					item.counter--;
				}
				else{
					this.categories.splice(index,1);
				}
			});
		}
		else{
			this.questions.push(question._id);
			this.categories.forEach(function(item, index){
				if(item.category == question.category){
					item.counter++;
				}
				else{
					this.categories.push({category: question.category, counter: 1});
				}
			});
		}
	}*/
