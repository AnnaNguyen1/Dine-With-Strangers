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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
