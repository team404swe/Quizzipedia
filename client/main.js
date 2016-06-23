import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList';
import quizCreationForm from '../imports/controllers/quizCreationForm';
import '../imports/startup/accounts-config.js';
 
/*angular.module('simple-todos', [
    angularMeteor,
    todosList.name,
    'accounts.ui'
]);
*/

angular.module('quiz-creation-form', [
    angularMeteor,
    quizCreationForm.name
]);
