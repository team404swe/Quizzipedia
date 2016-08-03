import { Meteor } from "meteor/meteor";
import { Questions } from "../publishers/questionPublisher.js";
import { QuestionsStatistics } from "../statistics/Statistics.js";

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
						var toInsert = {
							owner: Meteor.userId(),
							QMLtext,
							category,
							createdAt: new Date()						
						};
						
						Questions.insert(toInsert,function(err,docsInserted){
							if(docsInserted)
								QuestionsStatistics.insert({"_id": docsInserted, "rispCorrette" : 0 , "voltePresentata" : 0});
						});												
						ok= true;
					}
				}
		   });		   		  											
		return ok;
	},
	
	/*"questions.update" (questionID, QMLtext, category){
		Questions.update({'questionID': questionID}, {set {'QMLtext': QMLtext, 'category': category}});
	},*/
    
	"questions.remove" (questionId)
	{
        return Questions.remove({"_id" : questionId});
		//QuestionsStatistics.remove(questionId);
    }
});
