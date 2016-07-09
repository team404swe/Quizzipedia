import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Questions } from "../publishers/questionPublisher.js";
import { QuestionsStatistics } from "../statistics/Statistics.js";

import "../parser/Parser.js";
/*
Meteor.methods({
	"questions.insert" (QMLtext, category){
       
	   //var controllo = Meteor.call("check", QMLtext);//invoco il check
	   //if(controllo !== "OK") return controllo;
	   
       Questions.insert({
			QMLtext,
			category,
			createdAt: new Date(),
			owner: Meteor.userId(),
		});
		
		QuestionsStatistics.insert({
			Questions.find({}, {_id : 1}).sort(createdAt : -1).limit(1);
		});
		
		return controllo;
	},
	
	"questions.update" (questionID, QMLtext, category)
	{
		Questions.update({'questionID': questionID}, {set {'QMLtext': QMLtext, 'category': category}});
	},
    
	"questions.remove" (questionId)
	{
        Questions.remove(questionId);
		QuestionsStatistics.remove(questionId);
    }
});
*/
