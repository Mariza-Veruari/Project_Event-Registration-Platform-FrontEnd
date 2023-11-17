import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import useSession from "../../../../providers/session";
function EventForm({ model, viewMode, refetch }) {
  const navigate = useNavigate();
  const { user } = useSession();
  const [loading, setloading] = useState(false);
  const mine = model?.organizer === user._id;
  const alreadyAttending = model?.attendees.find(
    (x) => x.user._id === user._id
  );
  const renderAttendButton = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          disabled={loading}
          onClick={() => {
            setloading(true);
            axios
              .post(
                `/event/${
                  alreadyAttending
                    ? "unregister-from-event"
                    : "register-for-event"
                }/${model._id}`
              )
              .then(() => {
                if (refetch) {
                  refetch();
                  setloading(false);
                }
              });
          }}
        >
          {alreadyAttending ? "Unattend" : "Attend"}
        </Button>
      </div>
    );
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
          },
        }}
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post(
              `/event/${model ? `update-event/${model._id}` : "create-event"}`,
              {
                name: e.target.name.value,
                description: e.target.description.value,
                location: e.target.location.value,
                date: e.target.date.value,
              }
            )
            .then(
              (res) => {
                navigate("/my-events");
              },
              (err) => {
                console.log(err);
              }
            );
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {viewMode ? (
              <>
                <h3>Name: {model?.name}</h3>
                <h3>Description: {model?.description}</h3>
                <h3>Location: {model?.location}</h3>
                <h3>Date: {dayjs(model.date).format("YYYY-MM-DD")}</h3>
              </>
            ) : (
              <>
                <TextField
                  disabled={viewMode}
                  required
                  id="name"
                  label="Name"
                  name="name"
                  defaultValue={model?.name}
                />
                <TextField
                  disabled={viewMode}
                  required
                  id="description"
                  label="Description"
                  name="description"
                  defaultValue={model?.description}
                />
                <TextField
                  disabled={viewMode}
                  required
                  id="location"
                  label="Location"
                  name="location"
                  defaultValue={model?.location}
                />
                <TextField
                  disabled={viewMode}
                  required
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={
                    model?.date ? dayjs(model.date).format("YYYY-MM-DD") : null
                  }
                />
              </>
            )}
            {!viewMode && <Button type="submit">Save</Button>}
          </div>
        </div>
      </Box>
      {viewMode
        ? !mine && renderAttendButton()
        : model && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h1>Attendees</h1>
              <table>
                <thead>
                  <th>Emri</th>
                  <th>Email</th>
                </thead>
                <tbody>
                  {model?.attendees.length > 0 ? (
                    model?.attendees?.map((a) => {
                      return (
                        <tr>
                          <td>{a.user.name}</td>
                          <td>{a.user.email}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <h2>Nuk ka Attendees</h2>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
    </>
  );
}

export default EventForm;
