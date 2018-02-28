import './discover.html';

import { Books } from '/imports/api/books/books.js';

Template.discover.onCreated(function() {
  Meteor.subscribe('books.all');
})

Template.discover.helpers({
  books() {
    return Books.find().fetch();
  }
})