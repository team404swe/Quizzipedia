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
				QzMessage.showText(0, "Inserisci codice QML");
		}
		else{
			console.log(QMLtext);
			Meteor.call("parser.check", QMLtext, function(error, result) {
				if (error)
					QzMessage.showText(0, error);
				else{
					console.log(result);
					if(result)
						QzMessage.showText(2, "Il codice QML è valido");
					else
						QzMessage.showText(1, "Il codice QML è sintatticamente errato");
				}
			});
		}
	}
	
	saveQuestion(QMLtext, category){
		if(QMLtext=="" || category=="" || QMLtext==undefined || category==undefined){			
			QzMessage.showText(0, "Compila tutti i campi");
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
						QzMessage.showText(2, "La tua domanda è stata salvata!");						
					}
					else
						QzMessage.showText(0, "Il codice QML è sintatticamente errato");											
			});
		}
	}
	
	setVF(id){		
		document.getElementById(id).className = "btn";
		if(id == 'vero')
			document.getElementById('falso').className = "btn grey";		
		else
			document.getElementById('vero').className = "btn grey";
	}
}

export default angular.module('questionForm', [
  angularMeteor
])
  .component('questionForm', {
    templateUrl: 'imports/templates/questionForm.html',
    controller: ['$scope', NewQuestionController]
  });
  
