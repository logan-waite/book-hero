import './discover.html';

import { Books } from '/imports/api/books/books.js';

Template.discover.onCreated(function() {
  Meteor.subscribe('books');
})

Template.discover.helpers({
  books() {
    return Books.find().fetch();
  }
})