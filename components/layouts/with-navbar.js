import React, { Fragment } from 'react';

import Navbar from '../base/Navbar';

const WithNavbar = ({ children }) => (
  <Fragment>
    <Navbar />
    { children }
  </Fragment>
);

export default WithNavbar;
