import React from 'react';
import { Button } from '@mui/material';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function EventItem({ event, myEvent, admin, refetch }) {
  const navigate = useNavigate();
  return (
    <tr>
      <td>{event.name}</td>
      <td>{event.description}</td>
      <td>{new Date(event.date).toDateString()}</td>
      <td>{event.location}</td>
      <td>
        {myEvent || admin ? (
          <>
            <Button
              onClick={() => {
                navigate(`/event/${event._id}/edit`);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                axios.delete(`/event/delete-event/${event._id}`).finally(() => {
                  if (refetch) {
                    refetch();
                  }
                });
              }}
              color='error'
            >
              Delete
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              navigate(`/event/${event._id}/view`);
            }}
          >
            View
          </Button>
        )}
      </td>
    </tr>
  );
}

export default EventItem;
