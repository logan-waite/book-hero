// Definition of the Books collection
import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';

export const Lists = new Mongo.Collection('lists');

const Schema = new SimpleSchema({
  books : {
    type: Array,
  },
  'books.$' : Object,
  'books.$.book_id' : String,
  'books.$.currently_reading' : Boolean,
  'books.$.finished' : Boolean,
  'books.$.date_added' : Date,
  'books.$.date_finished' : Date
})