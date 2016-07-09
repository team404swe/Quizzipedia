import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('questions');

if (Meteor.isServer)
{
	Meteor.publish('questions', function questionsPublication() {
		return Questions.find();
	});
}
