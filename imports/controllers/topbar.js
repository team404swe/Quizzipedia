import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/topbar.html';

class TopbarController {
	constructor($scope){
		$scope.viewModel(this);
	}
}


// create a module
export default angular.module('topbar', [
  angularMeteor, 
]).component('topbar', {
  templateUrl: 'imports/templates/topbar.html',  
  controllerAs: 'topbar',
  controller: [ '$scope' , TopbarController ]
})
