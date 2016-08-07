import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from '../templates/userProfile.html';

class UserProfileController{
	constructor($scope) {
		$scope.viewModel(this);          
	}
}

export default angular.module('userProfile', [
  angularMeteor
])
  .component('userProfile', {
    templateUrl: 'imports/templates/userProfile.html',
    controller: ['$scope', UserProfileController]
  });
