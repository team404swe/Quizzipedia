import angular from 'angular';
import angularMeteor from 'angular-meteor';
//import { Accounts } from "meteor/accounts-base";
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

/*

<nav class="top-nav">
	<div class="nav-wrapper">
		<a href="/" class="brand-logo center">Quizzipedia</a>
		<ul id="nav-mobile" class="right hide-on-med-and-down">   									
		</ul>
	</div>
</nav>

*/