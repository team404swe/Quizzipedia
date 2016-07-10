import { Meteor } from 'meteor/meteor';
import '../imports/publishers/questionPublisher.js';
import '../imports/publishers/quizPublisher.js';
import '../imports/statistics/Statistics.js';
import '../imports/methods/questionMethods.js';
import '../imports/parser/Parser.js';

Meteor.startup(() => {
  // code to run on server at startup
});
