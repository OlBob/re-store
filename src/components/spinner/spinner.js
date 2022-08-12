import React from 'react';
import './spinner.css';
import { useState } from 'react';

const Spinner = () => {
  const [loading, setLoading] = useState(true);

  const spinnerBody =
    <div className="loadingio-spinner-double-ring-m0cg1kvljmc">
      <div className="ldio-umj8ilt6xc">
        <div></div>
        <div></div>
        <div><div></div></div>
        <div><div></div></div>
      </div>
    </div>;

  const toggleLoading = () => loading ? setLoading(false) : setLoading(true)

  return (
    <div>
      <button onClick={toggleLoading}>changeState</button>
      {loading ? spinnerBody : null}
    </div>
  );
};

export default Spinner;
