import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizList.html';

import { Quizzes } from '../publishers/quizPublisher.js';
import { Questions } from '../publishers/questionPublisher.js';
import checkAnswer from '../parser/Parser.js'

class QuizListController{
	constructor($scope) {
		$scope.viewModel(this);     
		
		this.category = "";		
		this.userOnly = false;
		this.toDelete;
		
		/*Materilize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : true 
			});
		});     
		
		$(document).ready(function(){
			// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
			$('.modal-trigger').leanModal();
		});			
		
		this.subscribe('quizzes');
		this.subscribe('questions');			
	
		this.helpers({
			quizzes(){
				
				this.category = this.getReactively('category');
									
				if(this.category == ""){					
					return Quizzes.find({}, {"sort" : [['createdAt', 'desc']]});
				}
				else{					
					return Quizzes.find({ "categories" : this.category}, {"sort" : [['createdAt', 'desc']]});
				}
			},
			
			questions() {
				return Questions.find({}, {"sort" : [['createdAt', 'desc']]});
			},
			
			// Recupera tutte le categorie dei quiz per popolare la select, senza inserire duplicati
			inputCategories (){
				var resultArrays = [];
				Quizzes.find().forEach(function(quiz) { resultArrays.push(quiz.categories) });				
				var resultCategories = [];
				resultArrays.forEach(function(arr) { 
					for ( i=0; i<arr.length; i++){
						var duplicate = false;
						resultCategories.forEach(function(inserted){
							if(inserted == arr[i]){
								duplicate = true;
							}
						});
						if(!duplicate){
							resultCategories.push(arr[i]);
						}
					}										
				});				
				return resultCategories;
			}
		});			
	}
	
	getAuthor(quizOwnerId){		
		return Meteor.users.findOne({"_id" : quizOwnerId}).username;				
	}
	
	isOwner(ownerId){
		return Meteor.userId() == ownerId;
	}
	
	setQuiz(qid)
	{ debugger;
		var tempQuiz = Quizzes.find({_id: qid}).fetch();
		quizComp = tempQuiz[0];
		for (var i = 0; i< quizComp.questions.length; i++ )
		{ var quest =Questions.find( { _id: quizComp.questions[i]}).fetch();
			quizComp.questions[i] = undefined;
			quizComp.questions[i] = checkAnswer(quest[0].QMLtext);
		}
		quizComp._author = getAuthor(quizComp.owner);
	}
	
	deleteQuiz(quiz){
		if(quiz){			
			Meteor.call("quizzes.remove", quiz, function(error, result) {
				if (error)
					QzMessage.showText(0, error);
				else{					
					if(result){						
						QzMessage.showText(2, "Your quiz has been removed!");
					}
					else{
						QzMessage.showText(0, "Can't remove quiz");											
					}
					this.toDelete = undefined;
				}
			});
		}
		else{
			QzMessage.showText(0,"Error removing quiz");
		}
	}
	
	openAlertQuiz(quizId){		
		this.toDelete = quizId;					
		$('#quizModal').openModal();
	}
}

export default angular.module('quizList', [
  angularMeteor,  
])
  .component('quizList', {
    templateUrl: 'imports/templates/quizList.html',
    controller: ['$scope', QuizListController]
  });
