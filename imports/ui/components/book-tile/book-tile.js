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

    Meteor.call("isBookInList", book_id, (error, result) => {
      if (error) {
        console.log(error);
      } else if (result === undefined) {
        console.log("addBookToList returned undefined");
      } else {
        if (! result) {
          Meteor.call("addBookToList", book_id, Meteor.user().profile.list_id, (error, result) => {
            if (error) {
              console.log(error);
            } else if (result === undefined) {
              console.log("addBookToList returned undefined");
            }
          })
        }
      }
    });
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
        if (result) {
          Meteor.call('setBookToCurrentlyReading', book_id, (error, result) => {
            if (error) {
              console.log(error);
            } else if (result === undefined) {
              console.log("isBookInList returned undefined");
            }
          });
        } else {
          Meteor.call("addBookToList", book_id, Meteor.user().profile.list_id, (error, result) => {
            if (error) {
              console.log(error);
            } else if (result === undefined) {
              console.log("addBookToList returned undefined");
            } else {
              Meteor.call('setBookToCurrentlyReading', book_id, (error, result) => {
                if (error) {
                  console.log(error);
                } else if (result === undefined) {
                  console.log("isBookInList returned undefined");
                }
              });
            }
          })
        }
      }
    })
  },
  'click .finish-reading'(event) {
    event.preventDefault();

    var book_id = getBookId(event.target);
    Meteor.call("setBookToFinished", book_id, (error_result) => {
      if (error) {
        console.log(error);
      } else if (result === undefined) {
        console.log("addBookToList returned undefined");
      }
    })
  }
})

function getBookId(target) {
  return $(target).parents('.book-actions').attr("value");
}