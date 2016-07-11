import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/questionForm.html';

class NewQuestionController{
	constructor($scope) {
		$scope.viewModel(this);   
		
		//JQuery per caricare correttamente la select
		$(document).ready(function() {
			$('select').material_select();
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
					if(result == "QML text is correct")
						QzMessage.showText(2, result);
					else
						QzMessage.showText(1, result);
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
					if(result == "OK")
					{
						QzMessage.showText(2, "Your question has been saved!");
						this.QMLtext="";
						this.category="";
					}
					else if(result == "QML text has sintax errors")
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
  
