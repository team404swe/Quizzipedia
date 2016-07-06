import { Quizzes } from '../publishers/quizPublisher.js';

var collection = 'quizzes';

function getCollection(){
	return collection;
}

function subscribe(controller){
	controller.subscribe(collection);
}
