import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor'
import template from '../templates/questionForm.html';
import '../methods/questionMethods.js';

class NewQuestionController{
	constructor($scope) {
		$scope.viewModel(this);   											   	
	}	
	
	saveQuestion(QMLText, category){
		if(QMLText=="" || category==""){
			console.log("campi dati necessari");
		}
		else{
			Meteor.call("questions.insert",	QMLText, category );
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
  
