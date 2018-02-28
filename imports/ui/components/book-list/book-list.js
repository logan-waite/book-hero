import './book-list.html';
import '../book-tile/book-tile.js';
import { Lists } from "/imports/api/lists/lists.js";
import { Books } from "/imports/api/books/books.js";

Template.bookList.onCreated(function() {
  // Subscribe to the users list
    Meteor.subscribe("lists.user");
    Meteor.subscribe("books.all");

  // If the user doesn't have a list_id, make a list for the user.
  if (Meteor.user() !== undefined && Meteor.user().profile.list_id == "") {
    Meteor.call("createList", (error, result) => {
      if (error) {
        console.log(error);
      }
      else if (result === undefined){
        console.log("createList returned undefined");
      }
      else {
        Meteor.users.update({_id:Meteor.user()._id}, {$set: {"profile.list_id":result}})
        // Meteor.user().profile.list_id = result;
      }
    })
  }
})

Template.bookList.helpers({
  list() {
    var list = Lists.findOne();

    for (var i = 0; i < list.books.length; i++) {
      var listedBook = list.books[i];
      var book = Books.findOne({_id:listedBook.book_id})
      // listedBook.book = book;
      // delete book._id;
      Object.assign(listedBook, book);
    }
    return list;
  }
})