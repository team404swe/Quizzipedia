import { Mongo } from 'meteor/mongo';

export const Quizzes = new Mongo.Collection('quizzes');

if (Meteor.isServer)
{
	Meteor.publish('quizzes', function quizPublication() {
		return Quizzes.find();
	});
}
