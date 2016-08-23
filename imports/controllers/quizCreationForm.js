import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/quizCreationForm.html';

import { Questions } from '../publishers/questionPublisher.js';
import QML2HTML from '../interpreter/QML2HTML.js';

class NewQuizController{
	constructor($scope) {
		$scope.viewModel(this);  
		
		/*Materialize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : false 
			});
		});      						
		
		this.questions = [];	
		this.categories= [];
		this.time;
		this.title;
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
			QzMessage.showText(0, "Compila tutti i campi");
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
			this.time = null;
			this.title = "";
			this.description = "";
		}
	}
	
	getQuestionDetails(QMLtext){		
		var questionDetails = QML2HTML(QMLtext);
		if(questionDetails)
			return questionDetails;
		else
			console.log("Error nel caricamento dei dettagli del quiz");
	}	
	
	getFullQuestionType(shortType){
		var fullType;
		switch(shortType){
			case "VF":
				fullType = "Vero o Falso";
				break;
			case "MU":
				fullType = "Risposta multipla (unica risposta esatta)";
				break;
			case "MX":
				fullType = "Risposta multipla (più risposte esatte)";
				break;
			case "AS":
				fullType = "Associazione";
				break;
			case "OD":
				fullType = "Ordinamento";
				break;
			default:
				fullType =shortType;
				break;
		}
		return fullType;
	}
	
	getCorrectAnswer(question)
	{
		var answer = "";
		//return question.QMLtext.substring(11, 13);
		switch(this.getFullQuestionType(this.getQuestionDetails(question.QMLtext).type)){
			case "Vero o Falso":
				if(question.QMLtext.indexOf('<answer isRight="yes"></answer>') > 0)
					answer = "Vero";
				else
					answer = "Falso";
				break;
			case "Risposta multipla (unica risposta esatta)":
				answer = question.QMLtext.substring(question.QMLtext.search('<answer isRight="yes">')+22, question.QMLtext.indexOf("</answer>", question.QMLtext.search('<answer isRight="yes">')+22));
				break;
			case "Risposta multipla (più risposte esatte)":
				var ls = question.QMLtext.split('<answer isRight="yes">');
				var ls1 = [];
				for(var i = 1; i < ls.length; i++)
				{
					ls1.push(" " + ls[i].split('</answer>')[0].trim());
					
				}
				answer = ls1.toString().trim();
				break;
			case "Associazione":
			
				break;
			case "Ordinamento":
			
				break;
		}
		
		return answer;
	}
}

export default angular.module('quizCreationForm', [
  angularMeteor
])
  .component('quizCreationForm', {
    templateUrl: 'imports/templates/quizCreationForm.html',    
    controller: ['$scope', NewQuizController]
  });
