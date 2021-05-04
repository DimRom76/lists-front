import React from 'react';
import { Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VerifyView(props) {
  const [message, setMessage] = useState('');
  const token = props.match.params.token;

  useEffect(() => {
    axios
      .get(`/users/verify/${token}`)
      .then(({ data }) => {
        setMessage(data.message);
      })
      .catch(error => {
        if (error.response) {
          setMessage(error.response.data.message);
        } else if (error.request) {
          setMessage(error.request);
        } else {
          setMessage(error.message);
        }
      });
  }, [token]);

  return (
    <div className="container">
      <Paper className="paper">
        <h1>Верификация</h1>
        <p>{message}</p>
      </Paper>
    </div>
  );
}
