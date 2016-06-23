import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import questionForm from '../imports/controllers/questionForm';
import '../imports/startup/accounts-config.js';
 
/*angular.module('simple-todos', [
    angularMeteor,
    todosList.name,
    'accounts.ui'
]);
*/

angular.module('question-form', [
    angularMeteor,
    questionForm.name
]);
