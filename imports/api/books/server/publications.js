// All character related publications

import { Meteor } from 'meteor/meteor';
import { Books } from '../books.js';

Meteor.publish('books', function () {
  return Books.find();
});