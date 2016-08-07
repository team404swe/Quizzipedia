import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/questionForm.html';

class NewQuestionController{
	constructor($scope) {
		$scope.viewModel(this);   
		
		this.QMLText;
		this.category;				
		
		/*Materialize collapsible initialization*/
		$(document).ready(function(){
			$('.collapsible').collapsible({
			  accordion : true 
			});
		});		
		
		/* Materialize tabs initilization*/
		$(document).ready(function(){
			$('ul.tabs').tabs();
		});
	}	
	
	check(QMLtext){		
		if(QMLtext=="" || QMLtext==undefined){
				QzMessage.showText(0, "Missing QML text");
		}
		else{
			console.log(QMLtext);
			Meteor.call("parser.check", QMLtext, function(error, result) {
				if (error)
					QzMessage.showText(0, error);
				else{
					console.log(result);
					if(result)
						QzMessage.showText(2, "QML syntax is valid");
					else
						QzMessage.showText(1, "QML text has sintax errors");
				}
			});
		}
	}
	
	saveQuestion(QMLtext, category){
		if(QMLtext=="" || category=="" || QMLtext==undefined || category==undefined){			
			QzMessage.showText(0, "Please fill the form data");
		}
		else{
			Meteor.call("questions.insert",	QMLtext, category, function(error, result) {
				if (error)
					QzMessage.showText(0, error);
				else
					console.log(result);
					if(result)
					{
						this.QMLtext="";
						this.category="";
						QzMessage.showText(2, "Your question has been saved!");						
					}
					else
						QzMessage.showText(0, "QML text has sintax errors");											
			});
		}
	}
}

export default angular.module('questionForm', [
  angularMeteor
])
  .component('questionForm', {
    templateUrl: 'imports/templates/questionForm.html',
    controller: ['$scope', NewQuestionController]
  });
  
