import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/quizList.html';

import { Quizzes } from '../publishers/quizPublisher.js';
import { Questions } from '../publishers/questionPublisher.js';
import checkAnswer from '../parser/Parser.js'

class QuizListController{
	constructor($scope) {
		$scope.viewModel(this);     
		
		this.category;
		this.inputCategories = [
            {
                name: 'Tutte'
            },
            {
                name: 'Geografia'
            },
            {
                name: 'Storia'
            },
            {
                name: 'SWE'
            },
            {
                name: 'Informatica'
            }
        ];
		
		/*Materilize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : true 
			});
		});     
		
		/*Materialize select initialization*/
		$(document).ready(function() {
			$('select').material_select();
		}); 
		
		this.subscribe('quizzes');
		this.subscribe('questions');
	
		this.helpers({
			quizzes(){
				console.log(this.category);
				if(this.category == "Tutte"){
					console.log("machecazzo");
					return Quizzes.find({}, {"sort" : [['createdAt', 'desc']]});
				}
				else{
					console.log("machecazzo cetogory");
					return Quizzes.find({ "categories" : this.category}, {"sort" : [['createdAt', 'desc']]});
				}
			},
			
			questions() {
				return Questions.find({}, {"sort" : [['createdAt', 'desc']]});
			}	
		});			
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
		
	}
	
	reload(){
		this.quizzes();
	}
}

export default angular.module('quizList', [
  angularMeteor,  
])
  .component('quizList', {
    templateUrl: 'imports/templates/quizList.html',
    controller: ['$scope', QuizListController]
  });
