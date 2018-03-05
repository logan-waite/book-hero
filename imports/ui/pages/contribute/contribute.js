import "./contribute.html";

import { Books } from '/imports/api/books/books.js';

Template.contribute.onCreated(function() {
  Meteor.subscribe('books.all');
})

Template.contribute.events({
  'submit #new-book' (event) {
    event.preventDefault();

    const target = event.target;

    const attributes = [
      {
        name : target.attribute_1.value,
        points : target.attribute_1_amount.value
      },
      { name : target.attribute_2.value,
        points : target.attribute_2_amount.value
      },
      {
        name : target.attribute_3.value,
        points : target.attribute_3_amount.value
      }
    ];

    const book = {
      title : target.book_title.value,
      author : target.book_author.value,
      summary : target.book_summary.value,
      xp : target.book_xp.value,
      attributes : attributes
    }

    Meteor.call("addBook", book);

    target.book_title.value = "";
    target.book_author.value = "";
    target.book_summary.value = "";
    target.attribute_1.value = "";
    target.attribute_1_amount.value = "";
    target.attribute_2.value = "";
    target.attribute_2_amount.value = "";
    target.attribute_3.value = "";
    target.attribute_3_amount.value = "";
    target.book_xp.value = "";
  }
})