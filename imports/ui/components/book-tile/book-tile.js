import './book-tile.html';

Template.bookTile.helpers({
  notInList() {
    if (this.book_id === undefined) {
      return true;
    }
    return false;
  }
})

Template.bookTile.events({
  'click .add-to-list'(event) {
    event.preventDefault();

    var book_id = getBookId(event.target);
    var list_id = Meteor.user().profile.list_id;
    console.log(list_id);

    // Now if the user has a list, add the book to the list (but not as currently reading);
    Meteor.call("addBookToList", book_id, Meteor.user().profile.list_id, (error, result) => {
      if (error) {
        console.log(error);
      } else if (result === undefined) {
        console.log("addBookToList returned undefined");
      } else {
        console.log(result + " books added to list")
      }
    })
  },
  'click .start-reading'(event) {
    event.preventDefault();

    var book_id = getBookId(event.target)
    Meteor.call("isBookInList", book_id, (error, result) => {
      if (error) {
        console.log(error);
      } else if (result === undefined) {
        console.log("isBookInList returned undefined");
      } else {
        console.log(result)
      }
    })
  }
})

function getBookId(target) {
  return $(target).parents('.book-actions').attr("value");
}