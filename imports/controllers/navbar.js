import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/navbar.html';

class NavbarController {
	constructor($scope){
		$scope.viewModel(this);
		
		this.helpers({
			isLoggedIn(){
				return !!Meteor.userId();
			}
		});
	}
}


// create a module
export default angular.module('navbar', [
  angularMeteor, 
  'accounts.ui'
]).component('navbar', {
  templateUrl: 'imports/templates/navbar.html',  
  controller: [ '$scope' , NavbarController ]
})
