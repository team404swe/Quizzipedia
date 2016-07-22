import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const QuizzesStatistics = new Mongo.Collection('QuizzesStatistics');
export const QuestionsStatistics = new Mongo.Collection('QuestionsStatistics');
export const UsersStatistics = new Mongo.Collection('UsersStatistics');

if (Meteor.isServer)
{
	Meteor.publish('QuizzesStatistics', function tasksPublication() {
	return QuizzesStatistics.find();
	});
}
if (Meteor.isServer)
{
	Meteor.publish('QuestionsStatistics', function tasksPublication() {
	return QuestionsStatistics.find();
	});
}
if (Meteor.isServer)
{
	Meteor.publish('UsersStatistics', function tasksPublication() {
	return UsersStatistics.find();
	});
}

Meteor.methods({
	"statistics.QuizExecutionStats" (QuizID, ArrayRisultato, UserID) {
		QuizzesStatistics.insert({
			QuizID,
			UserID,
			ArrayRisultato,
			doneAt: new Date()
		});	
	}
});