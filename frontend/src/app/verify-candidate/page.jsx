'use client';
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const VerifyCandidate = () => {
  const [token, setToken] = useState('');
  const [status, setStatus] = useState(null);

  const handleVerify = async () => {
    try {
      const response = await axios.post('/api/verify', { token });
      setStatus(response.data.status);
    } catch (error) {
      setStatus('Error in verification');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Candidate Document Verification
      </Typography>
      <TextField
        label="Enter Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleVerify} variant="contained" color="primary">
        Verify
      </Button>
      {status && <Typography variant="h6">{status}</Typography>}
    </Container>
  );
};

export default VerifyCandidate;
