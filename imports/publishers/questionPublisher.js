import { Mongo } from 'meteor/mongo';

export const Questions = new Mongo.Collection('Questions');

if (Meteor.isServer)
{
	Meteor.publish('Questions', function tasksPublication() {
	return Tasks.find();
	});
}