import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EventItem from './eventItem';
import useSession from '../../providers/session';

function EventList({ myEvents }) {
  const { user } = useSession();
  const admin = user?.role === 'Admin';
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axios
      .get(`/event${myEvents ? '/my-events' : ''}`)
      .then((res) => {
        if (res.data) {
          setEvents(res.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading) {
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Button
        onClick={() => {
          navigate('/event/new');
        }}
        style={{
          alignSelf: 'flex-end',
          visibility: myEvents || admin ? 'visible' : 'hidden',
        }}
      >
        Krijo Event
      </Button>
      <table>
        <thead>
          <th>Emri</th>
          <th>Pershkrimi</th>
          <th>Location</th>
          <th>Date</th>
          <th></th>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => {
              return (
                <EventItem
                  event={event}
                  myEvent={myEvents}
                  admin={admin}
                  refetch={fetchData}
                />
              );
            })
          ) : (
            <tr>
              <h3>Asnje Event</h3>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EventList;
