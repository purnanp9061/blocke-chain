import React, { useState } from 'react';

const RejectUser = () => {
  const [userId, setUserId] = useState('');
  const [resultMessage, setResultMessage] = useState('');

  const rejectUser = async () => {
    try {
      const response = await fetch(`http://localhost:5001/student/:id/reject`, {
        method: 'PUT',
      });

      const data = await response.json();

      if (response.ok) {
        setResultMessage(data.message);
      } else {
        setResultMessage(data.error || 'Error rejecting user.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResultMessage('An error occurred while rejecting the user.');
    }
  };

  return (
    <div>
      <h1>Reject User</h1>
      <label htmlFor="userId">User ID:</label>
      <input
        type="text"
        id="userId"
        placeholder="Enter Student ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={rejectUser}>Reject</button>
      <div>{resultMessage}</div>
    </div>
  );
};

export default RejectUser;
