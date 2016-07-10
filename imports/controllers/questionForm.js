import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/questionForm.html';

class NewQuestionController{
	constructor($scope) {
		$scope.viewModel(this);   			
	}	
	
	check(QMLtext){		
		if(QMLtext=="" || QMLtext==undefined){
			console.log("Testo QML vuoto");
		}
		else{
			Meteor.call("parser.check", QMLtext );
		}
	}
	
	saveQuestion(QMLtext, category){
		if(QMLtext=="" || category=="" || QMLtext==undefined || category==undefined){			
			QzMessage.showText(0, "Please fill the form data");
		}
		else{
			Meteor.call("questions.insert",	QMLtext, category );
			QzMessage.showText(2, "Your question has been saved!")			
			this.QMLtext="";
			this.category="";
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
  
