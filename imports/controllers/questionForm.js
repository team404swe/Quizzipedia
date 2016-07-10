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
				QzMessage.showText(0, "Testo QML assente");
		}
		else{
			console.log(QMLtext);
			var ris = "";
			Meteor.call("parser.check", QMLtext , function(error, result) {
				if (error)
					console.log(error);
				else
			console.log(result);
			if(result == "Testo QML corretto")
				QzMessage.showText(2, result);
			else
				QzMessage.showText(1, result);
			});
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
  
