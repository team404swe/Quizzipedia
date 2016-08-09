import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/quizCreationForm.html';

import { Questions } from '../publishers/questionPublisher.js';
import checkQML from '../parser/Parser.js';

class NewQuizController{
	constructor($scope) {
		$scope.viewModel(this);  
		
		/*Materilize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : false 
			});
		});      						
		
		this.questions = [];	
		this.categories= [];
		this.description;
				
		this.subscribe('questions');
		   
		this.helpers({
			questionList() {
				return Questions.find({}, {"sort" : [['createdAt', 'desc']]});
			}
		});   
	}
	
	toggleSelection(question){		
		var idpos= this.questions.indexOf(question._id);
		var categoryPos = this.categories.map(function(c) {return c.category; }).indexOf(question.category); 
		
		if(idpos > -1){
			this.questions.splice(idpos,1);						
			
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
			if(categoryPos == -1){
				this.categories.push({category: question.category, counter: 1});				
			}
			else{
				this.categories[categoryPos].counter++;
			}
		}
	}
	
	saveQuiz(title, questions, categories, description, time){			
				
		if(title == undefined || time == undefined ){
			QzMessage.showText(0, "Inserisci tutti i dati necessari");
		}
		else if(questions.length == 0 || categories.length==0){
			QzMessage.showText(0, "Seleziona almeno una domanda");
		}
		else{			
			if(description == "" || description == null){
				QzMessage.showText(1, "La descrizione del Quiz è vuota");
			}
			categories=  this.categories.map(function(item){ return item.category});
			Meteor.call("quizzes.insert", title, questions, categories, description, time);
			QzMessage.showText(2,'Il tuo quiz è stato salvato!');	
			this.questions = [];
			this.categories = [];
			this.description = "";
		}
	}
	
	getQuestionDetails(QMLtext){		
		var questionDetails = checkQML(QMLtext);
		if(questionDetails)
			return questionDetails;
		else
			console.log("Error retrieving question details");
	}	
}

export default angular.module('quizCreationForm', [
  angularMeteor
])
  .component('quizCreationForm', {
    templateUrl: 'imports/templates/quizCreationForm.html',    
    controller: ['$scope', NewQuizController]
  });
