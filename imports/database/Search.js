import { Meteor } from "meteor/meteor";
import { Quizzes } from "../publishers/quizPublisher";
import { Questions } from "../publishers/questionPublisher.js";

Meteor.methods({
	"quizzes.search" (string) {
		return Quizzes.find({titolo : {$regex : ".*" . string . "*"}, desc : {$regex : ".*" . string . "*"}});
	},
	
	"question.search" (string) {
		return Questions.find ({testo : {$regex : ".*" . string . "*"}});
	}
});