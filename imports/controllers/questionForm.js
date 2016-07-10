import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/questionForm.html';

class NewQuestionController{
	constructor($scope) {
		$scope.viewModel(this);   	
		this.questionInserted= false;
	}	
	
	check(QMLtext){
		console.log(QMLtext);
		Meteor.call("parser.check", QMLtext );
	}
	
	saveQuestion(QMLtext, category){
		console.log(QMLtext);
		console.log(category);
		if(QMLtext=="" || category=="" || QMLtext==undefined || category==undefined){
			console.log("campi dati necessari");
		}
		else{
			Meteor.call("questions.insert",	QMLtext, category );
			this.questionInserted= true;
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
  
