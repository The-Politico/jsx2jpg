import React from 'react';

const HelloHead = (props) => (
  <div>
    <head>
      <link href='https://fonts.googleapis.com/css?family=Muli&display=swap' rel='stylesheet' />
    </head>
    <h1 style={{ fontFamily: 'Muli' }}>Hello Andrew</h1>
  </div>
);

export default HelloHead;

export { Helmet } from 'react-helmet';
