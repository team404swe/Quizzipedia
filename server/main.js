import { Meteor } from 'meteor/meteor';
import '../imports/publishers/questionPublisher.js';
import '../imports/publishers/quizPublisher.js';
import '../imports/statistic/Statistics.js';
import '../imports/api/questions.js';

Meteor.startup(() => {
  // code to run on server at startup
});
