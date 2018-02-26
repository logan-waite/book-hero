// Definition of the Books collection
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Books = new Mongo.Collection('books');

var Schema = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author",
  },
  summary: {
    type: String,
    label: "Brief Summary",
    optional: true,
    max: 1000
  }
})

Books.attachSchema(Schema);