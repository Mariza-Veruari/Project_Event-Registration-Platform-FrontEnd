import React, { useEffect, useState } from "react";
import EventForm from "../common/eventForm";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
function EditEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  useEffect(() => {
    axios.get(`/event/${id}`).then((res) => {
      if (res.data) {
        setEvent(res.data);
      }
    });
  }, [id]);
  if (!event) {
    return (
      <div
        style={{
          padding: 16,
          paddingTop: 32,
        }}
      >
        loading...
      </div>
    );
  }
  return <EventForm model={event} />;
}

export default EditEventPage;
