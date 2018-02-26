// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Books } from '../../api/books/books.js';

Meteor.startup(() => {

  if (Books.find().count() === 0) {
    const data = [
      {
        title : "The Way of Kings",
        author : "Brandon Sanderson",
        summary : "The story of people trying to save their world."
      },
      {
        title : "Around the World in 80 Days",
        author : "Jules Verne",
        summary : "A man takes a bet to travel around the world in 80 days."
      },
      {
        title : "Outliers",
        author : "John C. Maxwell",
        summary : "Looking at the people who are the best in their field."
      },
      {
        title : "A Call to Arms",
        author : "Alan Dean Foster",
        summary: "Aliens approach Earth with the opportunity to fight their war.",
      },
      {
        title : "The Pioneer Woman: Black Heels to Tractor Wheels",
        author : "Ree Drummond",
        summary : "The Pioneer Woman tells the story of meeting and marrying her beau",
      }
    ];

    data.forEach(book => Books.insert(book));
  }

});
