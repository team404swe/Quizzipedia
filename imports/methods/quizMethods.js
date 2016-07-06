import { Meteor } from "meteor/meteor";
import Quizzes from "../publishers/quizPublisher";

Meteor.methods({
   "quizzes.insert" (title, questions, categories, time){
       
       Quizzes.insert({
           title,
           questions,
           categories,
           time,
           createdAt: new Date(),
           owner: Meteor.userId(),
           //username: Meteor.user().username
       });
   },
    
    "quizzes.remove" (quizId){
        
        Quizzes.remove(quizId);
    }
    
});