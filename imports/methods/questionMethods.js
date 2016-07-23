import { Meteor } from "meteor/meteor";
import { Questions } from "../publishers/questionPublisher.js";
//import { Statistics } from "../statistics/Statistics.js";

Meteor.methods({
	"questions.insert" (QMLtext, category) {       
	   	   
	   	   var ok;
	   	   
		   Meteor.call("parser.check", QMLtext, function(error, result) {
			   debugger;
			   if(error){
				   QzMessage.showText(0, error);
				   return false;
			   }
				else
				{
					if(!result)
						
						ok= false;
					else{
						
						Questions.insert({
							owner: Meteor.userId(),
							QMLtext,
							category,
							createdAt: new Date()
							
						});												
						ok= true;
					}
				}
		   });
		   
		   return ok;
		
			/*var lastQuestion = Questions.find().sort({createdAt : -1}).limit(1);
			QuestionsStatistics.insert({lastQuestion._id});	*/		
},
	
	/*"questions.update" (questionID, QMLtext, category){
		Questions.update({'questionID': questionID}, {set {'QMLtext': QMLtext, 'category': category}});
	},*/
    
	"questions.remove" (questionId)
	{
        Questions.remove(questionId);
		//QuestionsStatistics.remove(questionId);
    }
});
