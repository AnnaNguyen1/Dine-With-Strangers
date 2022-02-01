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
    default:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlbmNoJTIwcmVzdGF1cmFudHxlbnwwfHwwfHw%3D&w=1000&q=80",
  },
  eventDate: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  attendeeLimit: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
