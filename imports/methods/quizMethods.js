import { Meteor } from "meteor/meteor";
import { Quizzes } from "../publishers/quizPublisher";

Meteor.methods({
   "quizzes.insert" (title, questions, categories, description, time){
	   
	   if (!Meteor.userId()){
           throw new Meteor.Error('non-authorized');
       }
       
       Quizzes.insert({
           title,
           questions,
           categories,
           description,
           time,
           createdAt: new Date(),
           owner: Meteor.userId(),
           //username: Meteor.user().username
       });
   },
    
    "quizzes.remove" (quizId){        
        return Quizzes.remove(quizId);
    }
    
});
