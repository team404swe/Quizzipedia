import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from '../templates/quizzipedia.html';
import topbar from '../controllers/topbar';
import navbar from '../controllers/navbar';
import quizList from '../controllers/quizList';
import questionList from '../controllers/questionList';
import quizCreationForm from '../controllers/quizCreationForm';
import questionForm from '../controllers/questionForm';
import searchForm from '../controllers/searchForm';
import quizCompilation from '../controllers/quizCompilation';
import quizResults from '../controllers/quizResults';
import quizHome from '../controllers/quizHome';
import quizStatistics from '../controllers/quizStatistics';
import userProfile from '../controllers/userProfile';


QzTimer = {tempo:0, format: 'mm:ss', timerID: undefined,quizPlay: false};
QzFine = { QzPunti : 0,	QzConferma : false}
class Quizzipedia {
	constructor($scope){
		debugger;
		$scope.viewModel(this);		
		
		//attivazione del menu mobile
		//$(".button-collapse").sideNav();
	}	
		
}

 cambia = function(){
	 debugger;
	 utente.nome = 'cambiato';
	 utente.cognome = 'FATTO!';
	 teto = 'finemondo';
 };
 quizComp = {};
 
QzMessage = {
	msgTipo : ['error','warning','success'],
	showAlert(msg){
		this.showText(0,msg);
		
		
	} ,
	showText(tipo,msg){	
		var msgTip = ['error','warning','success'];		
		var msgClass = "alert "+msgTip[tipo]; 	
		
		Materialize.toast(msg, 5000, msgClass);		
				
	}
 }
 

// create a module
export default angular.module('quizzipedia', [
  angularMeteor,
  uiRouter,
  topbar.name,
  navbar.name,
  quizList.name,
  questionList.name,
  quizCreationForm.name,
  questionForm.name,
  searchForm.name,
  quizCompilation.name,
  quizResults.name,
  quizHome.name,  
  quizStatistics.name,
  userProfile.name,
  'accounts.ui'
]).component('quizzipedia', {
  templateUrl: 'imports/templates/quizzipedia.html',  
  controllerAs: 'quizzipedia',
  controller: [ '$scope' , Quizzipedia ]
})
	.config(config);
 
	function config($locationProvider, $urlRouterProvider, $stateProvider) {		
	 
		$locationProvider.html5Mode(true);
	 
		$urlRouterProvider.otherwise('/quizlist');
	  
		$stateProvider.state('quizlist', {
						url: '/quizlist',
						template: '<quiz-list></quiz-list>'
		});
		$stateProvider.state('questionlist', {
						url: '/questionlist',
						template: '<question-list></question-list>'
		});
		$stateProvider.state('quizCreationForm', {
						url: '/quizCreationForm',
						template: '<quiz-creation-form></quiz-creation-form>'
		});
		$stateProvider.state('questionForm', {
						url: '/questionForm',
						template: '<question-form></question-form>'
		});
		$stateProvider.state('searchForm', {
						url: '/searchForm',
						template: '<search-form></search-form>'
		});
		$stateProvider.state('quizCompilation', {
						url: '/quizCompilation',
						template: '<quiz-Compilation></quiz-Compilation>'
		});
		$stateProvider.state('quizResults', {
						url: '/quizResults',
						template: '<quiz-results></quiz-results>'
		});
		$stateProvider.state('quizHome', {
						url: '/quizHome',
						template: '<quiz-home></quiz-home>'
		});
		$stateProvider.state('quizStatistics', {
						url: '/quizStatistics',
						template: '<quiz-statistics></quiz-statistics>'
		});
		$stateProvider.state('userProfile', {
						url: '/userProfile',
						template: '<user-profile></user-profile>'
		});
	}
