import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizList.html';

import { Quizzes } from '../publishers/quizPublisher.js';
import { Questions } from '../publishers/questionPublisher.js';
import checkAnswer from '../parser/Parser.js'

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
		this.subscribe('questions');
	
		this.helpers({
			questions() {
				return Questions.find({}, {"sort" : [['createdAt', 'desc']]});
			}					
		});	
	}
	
	setQuiz(qid){
		var tempQuiz = Quizzes.find({_id: qid}).fetch();
		quizComp = tempQuiz[0];
		for (var i = 0; i< quizComp.questions.length; i++ )
		{ var quest =Questions.find( { _id: quizComp.questions[i]}).fetch();
			quizComp.questions[i] = undefined;
			quizComp.questions[i] = checkAnswer(quest[0][0].QMLtext);
		}
		
	}
}

export default angular.module('quizList', [
  angularMeteor,  
])
  .component('quizList', {
    templateUrl: 'imports/templates/quizList.html',
    controller: ['$scope', QuizListController]
  });
