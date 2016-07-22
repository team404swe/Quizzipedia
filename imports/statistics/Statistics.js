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
	},
		   
	"statistics.UserExecutionStats" (UserID, QuestionAnswered, QuestionCorrectAnswered) {
		var new1 = 0;
		var new2 = 0;
		UserStatistics.findOne({"_id" : UserID}, function(err, res) {
			if(err) {}
			if(result) {new1 = vecchi_dati[0].AnsweredQuestions; new2 = vecchi_dati[0].CorrectAnswers;}
			else {}
		});
		UsersStatistics.update(
			{"_id" : UserID},
			{"AnsweredQuestions" : new1 + QuestionAnswered, "CorrectAnswers" : new2 + QuestionCorrectAnswered},
			{upsert: true}
		);	
	},
		   
	"statistics.QuestionExecutionStats" (QuestionID, Correct) {
		var new1 = 0;
		var new2 = 0;
		QuestionsStatistics.find({"_id" : QuestionID}, function (err, res) {
			if(err) {}
			if(result) {new1 = res[0].rispCorrette; new2 = res[0].voltePresentatavvvv;}
			else {}
		});
		
		
		QuestionsStatistics.update(
			{"_id" : QuestionID},
			{
				"rispCorrette" : new1 + Correct,
				"voltePresentata" : new2 + 1
			},
			{upsert: true}
		);	
	}
});