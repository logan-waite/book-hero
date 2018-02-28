// All character related publications

import { Meteor } from 'meteor/meteor';
import { Lists } from '../lists.js';

Meteor.publish('lists.all', function () {
  return Lists.find();
});

Meteor.publish('lists.user', function() {
  return Lists.find({_id : Meteor.user().profile.list_id})
})