import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lists } from './lists.js';

Meteor.methods({
  createList() {
    var newList = {books: []};

    return Lists.insert(newList);
  },
  addBookToList(book_id, list_id, currently_reading = false) {
    // TODO: Make sure a book of this id doesn't already exist in the list
    check(book_id, String);
    check(list_id, String);
    check(currently_reading, Boolean);

    var book = {
      book_id : book_id,
      currently_reading : currently_reading,
      finished : false,
      date_added : new Date(),
      date_finished : null
    };

    return Lists.update(
      {_id:list_id},
      { $push : { books: book } }
    )

  }
});