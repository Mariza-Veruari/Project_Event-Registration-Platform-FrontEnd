const mongoose = require('mongoose');
const attendeeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
});

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;
