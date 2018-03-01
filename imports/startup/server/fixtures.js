// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Books } from '../../api/books/books.js';

Meteor.startup(() => {

  if (Books.find().count() === 0) {
    const data = [
      {
        title : "The Way of Kings",
        author : "Brandon Sanderson",
        summary : "The story of people trying to save their world.",
        xp : 1000,
        attributes : [
          {
            name : "Imagination",
            points : 4,
          },
          {
            name : "Endurance",
            points : 2,
          }
        ]
      },
      {
        title : "Around the World in 80 Days",
        author : "Jules Verne",
        summary : "A man takes a bet to travel around the world in 80 days.",
        xp : 500,
        attributes : [
          {
            name : "Imagination",
            points : 3,
          }
        ]
      },
      {
        title : "Outliers",
        author : "John C. Maxwell",
        summary : "Looking at the people who are the best in their field.",
        xp : 750,
        attributes : [
          {
            name : "Intelligence",
            points : 3
          }
        ]
      },
      {
        title : "A Call to Arms",
        author : "Alan Dean Foster",
        summary: "Aliens approach Earth with the opportunity to fight their war.",
        xp : 450,
        attributes : [
          {
            name : "Imagination",
            points : 3
          }
        ]
      },
      {
        title : "The Pioneer Woman: Black Heels to Tractor Wheels",
        author : "Ree Drummond",
        summary : "The Pioneer Woman tells the story of meeting and marrying her beau",
        xp : 300,
        attributes : [
          {
            name : "Creativity",
            points : 2
          }
        ]
      }
    ];

    data.forEach(book => Books.insert(book));
  }

});
