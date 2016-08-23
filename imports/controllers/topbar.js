import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/topbar.html';

class TopbarController {
	constructor($scope){
		debugger;
		$scope.viewModel(this);
		this.pippo = "pippo";
		
		this.helpers({
			isLoggedIn(){
				return !!Meteor.userId();
			}
		});
		
	}
	
	
}


// create a module
export default angular.module('topbar', [
  angularMeteor, 
  'accounts.ui'  
]).component('topbar', {
  templateUrl: 'imports/templates/topbar.html',  
  controllerAs: 'topbar',
  controller: [ '$scope' , TopbarController ]
});
