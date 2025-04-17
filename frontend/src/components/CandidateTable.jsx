// src/app/components/CandidateTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CandidateTable = () => {
  const candidates = [
    { name: 'John Doe', status: 'Verified', interview: 'Scheduled' },
    { name: 'Jane Smith', status: 'Pending', interview: 'Not Scheduled' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Interview Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate.name}>
              <TableCell>{candidate.name}</TableCell>
              <TableCell>{candidate.status}</TableCell>
              <TableCell>{candidate.interview}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidateTable;
