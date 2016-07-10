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
				QzMessage.showText(0, "Testo QML assente");
		}
		else{			
			var ris = "";
			Meteor.call("parser.check", QMLtext , function(error, result) {
				if (error){
					console.log(error);
					QzMessage.showText(1, "Testo QML invalido");
				}
				else{			
					if(result == "Testo QML corretto")
						QzMessage.showText(2, result);
					else
						QzMessage.showText(1, result);
				}
			});
		}
	}
	
	saveQuestion(QMLtext, category){
		if(QMLtext==undefined || category==undefined){			
			QzMessage.showText(0, "Please fill the required data");
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
  
