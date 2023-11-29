const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticate = require("../middleware/authenticate");


router.get("/", authenticate, eventController.listEvents);

 
router.get("/my-events", authenticate, eventController.myEvents);

 
router.post("/create-event", authenticate, eventController.createEvent);

 
router.post("/update-event/:id", authenticate, eventController.updateEvent);

 
router.delete("/delete-event/:id", authenticate, eventController.deleteEvent);

 
router.post(
  "/register-for-event/:id",
  authenticate,
  eventController.registerForEvent
);
router.post(
  "/unregister-from-event/:id",
  authenticate,
  eventController.unRegisterFromEvent
);

router.get("/:id", authenticate, eventController.getEvent);

module.exports = router;
