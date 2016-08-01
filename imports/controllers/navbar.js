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
		this.slideMenu();
		
		$('.collapsible').collapsible();
	}
	
	slideMenu(){
		$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
   
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
