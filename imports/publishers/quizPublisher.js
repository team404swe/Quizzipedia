import { Mongo } from 'meteor/mongo';

export const Quizzes = new Mongo.Collection('Quiz');

if (Meteor.isServer)
{
	Meteor.publish('Quiz', function tasksPublication() {
	return Tasks.find();
	});
}