import { Meteor } from "meteor/meteor";
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Questions = new Mongo.Collection('questions');

if(Meteor.isServer) {
    Meteor.publish("questions", function questionPublication() {
        return Questions.find();
    })
}
