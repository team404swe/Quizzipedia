import { Meteor } from "meteor/meteor";
import Questions from "../publishers/questionPublisher";

Meteor.methods({
   "questions.insert" (QMLtext, category){
       
       Questions.insert({
           QMLtext,
           category,
           createdAt: new Date(),
           owner: Meteor.userId(),
           //username: Meteor.user().username
       });
   },
    
    "questions.remove" (questionId){
        
        Questions.remove(questionId);
    }
    
});
