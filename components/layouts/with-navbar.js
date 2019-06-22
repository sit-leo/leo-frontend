import React, { Fragment } from 'react';

import Navbar from '../base/Navbar';

const WithNavbar = ({ children, logout }) => (
  <Fragment>
    <Navbar logout={logout} />
    { children }
  </Fragment>
);

export default WithNavbar;
