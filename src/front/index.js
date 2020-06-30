import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [message, setMessage] = useState('Hello World!');

  function handleClick() {
    fetch('/api/message')
      .then(res => res.json())
      .then(({ message }) => setMessage(message))
      .catch(err => setMessage(err.message));
  }

  return (
    <Fragment>
      <h1>Message</h1>
      <p>{message}</p>
      <button type="button" onClick={handleClick}>Click!</button>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));