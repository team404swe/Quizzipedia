import { Mongo } from 'meteor/mongo';

export const Quizzes = new Mongo.Collection('Quiz');

if (Meteor.isServer)
{
	Meteor.publish('quizzes', function tasksPublication() {
		return Quizzes.find();
	});
}
