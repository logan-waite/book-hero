import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lists } from './lists.js';
import { Books } from '../books/books.js'

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
  },
  isBookInList(book_id) {
    check(book_id, String);

    var list_id = Meteor.user().profile.list_id;
    var list = Lists.findOne({_id:list_id});

    for (var i = 0; i < list.books.length; i++) {
      var book = list.books[i];
      if (book_id == book.book_id) {
        return true;
      }
    }
    return false;
  },
  setBookToCurrentlyReading(book_id) {
    check(book_id, String);

    var list_id = Meteor.user().profile.list_id;
    var list = Lists.findOne({_id:list_id});

    for (var i = 0; i < list.books.length; i++) {
      var book = list.books[i];
      if (book_id == book.book_id) {
        return Lists.update(
          {_id:list_id, books : {$elemMatch: {book_id : book_id}}},
          { $set : {"books.$.currently_reading": true}}
        )
      }
    }
  },
  setBookToFinished(book_id) {
    check(book_id, String);
    var list_id = Meteor.user().profile.list_id;
    var list = Lists.findOne({_id:list_id});

    for (var i = 0; i < list.books.length; i++) {
      var book = list.books[i];
      if (book_id == book.book_id) {
        var book_info = Books.findOne({_id:book.book_id});

        var new_xp = book_info.xp + Meteor.user().profile.xp;
        var added_attributes = [];
        for (var attr in book_info.attributes) {
          added_attributes[book_info.attributes[attr].name] = book_info.attributes[attr].points;
        }

        Meteor.users.update(Meteor.userId(), {$set : {"profile.xp" : new_xp}});

        for (var j = 0; j < Meteor.user().profile.attributes.length; j++) {
          var user_attr = Meteor.user().profile.attributes[j];
          for (var attr in added_attributes) {
            if (attr == user_attr.name) {
              var new_attr_level = user_attr.level + added_attributes[attr];
              Meteor.users.update({_id:Meteor.userId(), "profile.attributes" : {$elemMatch : {name : attr}}}, {$set : {"profile.attributes.$.level" : new_attr_level}})
            }
          }
        }
        console.log(Meteor.user());
        return Lists.update(
          {_id:list_id, books : {$elemMatch: {book_id: book_id}}},
          {$set : {"books.$.currently_reading" : false, "books.$.finished" : true, "books.$.date_finished" : new Date()}}
        )
      }
    }
  }
});