import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Books } from './books.js';

Meteor.methods({
  addBook(book) {
    return Books.insert(book);
  }
});