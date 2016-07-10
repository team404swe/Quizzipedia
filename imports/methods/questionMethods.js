import { Meteor } from "meteor/meteor";
import { Questions } from "../publishers/questionPublisher.js";
//import { Statistics } from "../statistics/Statistics.js";

Meteor.methods({
	"questions.insert" (QMLtext, category){
       
	   //var controllo = Meteor.call("check", QMLtext);//invoco il check
	   //if(controllo !== "OK") return controllo;
	   
	   if (!Meteor.userId()){
           throw new Meteor.Error('non-authorized');
       }
	   else{
		   Meteor.call("parser.check", QMLtext, function(error, result) {
			   if(error)
				   console.log(error);
				else
				{
					if(result == "QML text has sintax errors")
						return result;
					Questions.insert({
						QMLtext,
						category,
						createdAt: new Date(),
						owner: Meteor.userId()
					});
					return "OK";
				}
		   });
		
			/*var lastQuestion = Questions.find().sort({createdAt : -1}).limit(1);
			QuestionsStatistics.insert({lastQuestion._id});	*/
		}		
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
