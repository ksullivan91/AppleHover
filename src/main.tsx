import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppleHover } from '.';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Fragment>
      <AppleHover>
        <div style={{ padding: '24px', background: '#000', width: 300 }}>
          <h1 style={{ color: '#fff' }}>Hello, world!</h1>
          <p style={{ color: '#fff' }}>
            This is a React component rendered with ReactDOM.createRoot.
          </p>
        </div>
      </AppleHover>
    </React.Fragment>
  </React.StrictMode>
);
