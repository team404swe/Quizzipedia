import angular from 'angular';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Quizzes } from "../publishers/quizPublisher";
import { Questions } from "../publishers/questionPublisher.js";

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
	"statistics.QuizExecutionStats" (QuizObject, UserID) {
		QuizzesStatistics.insert({
			QuizObject,
			UserID,
			doneAt: new Date()
		});	
		
		Quizzes.update(
			{ "_id" : QuizObject._id },
			{ $inc: { "esecuzioni" : 1 } }
		);
		
		for (var i = 0, len = arr.length; i < len; i++) {
			var conta = 0;
			if (QuizObject.questions[i].type === "VF")
			{	if(QuizObject.questions[i].ans === QuizObject.questions[i].risp)
				{
					conta = 1; 
				}
				
			}
			else if (this.myQuiz[i].type === "MU")
			{	if(QuizObject.questions[i].rightAns == QuizObject.questions[i].risp )
				{
					conta = 1; 
				}
				
			}
			else if (QuizObject.questions[i].type === "MX")
			{	var sentinella = true;
				var lo_quiz = QuizObject.questions[i];
				var lo_ans = lo_quiz.ans;
				if(lo_quiz.risp !== undefined)
				{				
					for(var j = 0; j < lo_ans.length; j++)
					{	
						if(  lo_quiz.risp[lo_ans[j].id] === undefined )
						{
							lo_quiz.risp[lo_ans[j].id] = false;
						}
						if( lo_quiz.rightAns[lo_ans[j].id] !== lo_quiz.risp[lo_ans[j].id] )
						{
							sentinella = false;
						}
					}							
					if( sentinella === true ){ conta = 1;}
				}
			}
			else if (QuizObject.questions[i].type === "AS")
			{
				if ( angular.equals( QuizObject.questions[i].rightAns , QuizObject.questions[i].risp ) )
				{
					conta = 1;
				}
			}
			else if (QuizObject.questions[i].type === "OD")
			{
				if ( angular.equals( QuizObject.questions[i].rightAns , QuizObject.questions[i].risp ) )
				{
					conta = 1;
				}
			}
			
			Meteor.call("statistics.QuestionExecutionStats", QuizObject.questions[i]._id, conta);
			Meteor.call("statistics.UserExecutionStats", QuizObject._idUser, 1, conta);
		}
	},
		   
	"statistics.UserExecutionStats" (UserID, QuestionAnswered, QuestionCorrectAnswered) {
		UsersStatistics.update(
			{"_id" : UserID},
			{ $inc: { "AnsweredQuestions" : QuestionAnswered, "CorrectAnswers" : QuestionCorrectAnswered} }
		);	
	},
		   
	"statistics.QuestionExecutionStats" (QuestionID, Correct) {		
		QuestionsStatistics.update(
			{"_id" : QuestionID},
			{ $inc: { "rispCorrette" : Correct, "voltePresentata" : 1 } }
		);	
	}
});