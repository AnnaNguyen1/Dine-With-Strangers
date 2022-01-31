const mongoose = require("mongoose");

const { Schema } = mongoose;

const eventSchema = new Schema({
  restaurantName: {
    type: String,
    required: true,
    trim: true,
  },
  restaurantAddress: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  eventDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  eventTime: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  attendeeLimit: {
    type: Number,
    min: 1,
    default: 1,
  },
  state: {
    type: String,
    enum: ["VIC", "NSW", "QLD", "SA", "NT", "TAS", "WA"],
    default: "VIC",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
