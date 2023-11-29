const Event = require('../models/Event');
const Attendee = require('../models/Attendee');
const User = require('../models/User');

exports.getEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId).lean();
    const attendees = await Attendee.find({ event: eventId }).populate('user');
    event.attendees = attendees;
    res.status(200).json(event);
  } catch (error) {
    console.log('Error in creating an event', error);
    res.status(500).json({ message: 'Error in viewing an event' });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    const { userId } = req.userData;
    Event.create({
      name,
      description,
      date: new Date(date),
      location,
      organizer: userId,
    });
    res.status(201).json(true);
  } catch (error) {
    console.log('Error in creating an event', error);
    res.status(500).json({ message: 'Error in creating an event' });
  }
};

 
exports.listEvents = async (req, res) => {
  try {
    const { userId } = req.userData; 
    const user = await User.findById(userId).lean();
    let filter = null;
    if (user.role !== 'Admin') {
      filter = { organizer: { $ne: userId } };
    }
    const events = await Event.find(filter); 

   
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); 
  }
};

 
exports.myEvents = async (req, res) => {
  const { userId } = req.userData;  
  try {
    const events = await Event.find({ organizer: userId }).lean();  

     
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });  
  }
};

 
exports.updateEvent = async (req, res) => {
  const { userId } = req.userData;  
  const eventId = req.params.id;  
  const updateData = req.body;  
  try {
    const event = await Event.findById(eventId);
    if (event.organizer.toString() !== userId.toString()) {
      const user = await User.findById(userId).lean();
      if (user.role !== 'Admin') {
        return res
          .status(400)
          .json({ message: 'You are not the event organizer' });
      }
    }
     
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

 
exports.deleteEvent = async (req, res) => {
  const eventId = req.params.id;  
  const { userId } = req.userData; 

  try {
    const event = await Event.findById(eventId);
    if (!event) res.status(404).json({ message: 'Event not found' });
    if (event.organizer.toString() !== userId.toString()) {
      const user = await User.findById(userId).lean();
      if (user.role !== 'Admin') {
        return res
          .status(400)
          .json({ message: 'You are not the event organizer' });
      }
    }
    const deletedEvent = await Event.findByIdAndDelete(eventId);  

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' }); 
    }

    res.status(200).json({ message: 'Event deleted successfully' });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });  
  }
};

 
exports.registerForEvent = async (req, res) => {
  const { userId } = req.userData;  
  const eventId = req.params.id;  

  try {
     
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

     
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const attending = await Attendee.findOne({ user: userId, event: eventId });
     
    if (attending) {
      return res
        .status(400)
        .json({ message: 'User is already registered for this event' });
    }
    const attendance = await Attendee.create({
      user: userId,
      event: eventId,
    });
    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.unRegisterFromEvent = async (req, res) => {
  const { userId } = req.userData;  
  const eventId = req.params.id;  

  try {
    const attending = await Attendee.findOne({ user: userId, event: eventId });
    
    if (attending) {
      await Attendee.findByIdAndDelete(attending.id);
      return res.status(200).json(true);
    }
    res.status(200).json(false);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
