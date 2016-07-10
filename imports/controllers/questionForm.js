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
		
	}
	
	saveQuestion(QMLtext, category){
		if(QMLtext=="" || category==""){
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
  
