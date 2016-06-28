import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/navbar.html';

class NavbarController {
	constructor($scope){
		$scope.viewModel(this);
	}
}


// create a module
export default angular.module('navbar', [
  angularMeteor, 
]).component('navbar', {
  templateUrl: 'imports/templates/navbar.html',  
  controllerAs: 'navbar',
  controller: [ '$scope' , NavbarController ]
})
