import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import useSession from '../../providers/session';

function UsersPage() {
  const { user } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axios
      .get(`/user`)
      .then((res) => {
        if (res.data) {
          setUsers(res.data);
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
      <table>
        <thead>
          <th>Emri</th>
          <th>Email</th>
          <th></th>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => {
              return (
                <tr>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <Button
                      onClick={() => {
                        axios.delete(`/user/${u._id}`).then(() => {
                          fetchData();
                        });
                      }}
                      color='error'
                      disabled={u._id === user._id}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <h3>Asnj User</h3>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
