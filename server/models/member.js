const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema

const memberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  payment_done: {
    type: Boolean,
    default: false,
  },
  amount_paid: {
    type: String,
    default: null,
  },
  transaction_token: {
    type: String,
    default: null
  },
  start_date: {
    type: Date,
    default: null
  },
  end_date: {
    type: Date,
    default: null
  },
  days_left: {
    type: Number,
    default: null
  },
  phone: {
    type: Number,
    required: true
  },
  batch: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("membership", memberSchema);