import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import questionList from '../imports/controllers/questionList';
import '../imports/startup/accounts-config.js';
 
/*angular.module('simple-todos', [
    angularMeteor,
    todosList.name,
    'accounts.ui'
]);
*/

angular.module('question-list', [
    angularMeteor,
    questionList.name
]);
