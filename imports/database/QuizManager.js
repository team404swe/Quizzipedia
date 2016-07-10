import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Quizzes } from "../publishers/quizPublisher.js";
import { QuizzesStatistics } from "../statistics/Statistics.js";

/*
Meteor.methods({
	"quizzes.insert" (title, questions, categories, time, createdAt, owner)
	{
		Quizzes.insert({
           title,
           questions,
           categories,
           time,
           createdAt,
           owner
           //username: Meteor.user().username
       });
	   
		QuizzesStatistics.insert({
			Quizzes.find({}, {_id : 1}).sort(createdAt : -1).limit(1);
		});
	}

	"quizzes.update"(quizID, title, questions, categories, time)
	{
		Quizzes.update({'quizID': quizID}, {set {'title': title, 'questions': questions, 'categories': categories, 'time': time}});
	}
	
	"quizzes.remve" (quizID)
	{
        Quizzes.remove(quizId);
		QuizzesStatistics.remove(quizId);
	}
});
* */
