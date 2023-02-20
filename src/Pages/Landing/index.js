import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function LandingPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    // TODO: replace this with the code that sends the pin to your back-end API
    console.log(`Pin ${pin} submitted`);

    // Navigate to the restaurant selection page
    navigate('/restaurant-selection');
  }

  function handlePinChange(event) {
    setPin(event.target.value);
  }

  return (
    <div>
      <h1>Enter your pin</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={pin} onChange={handlePinChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LandingPage;
