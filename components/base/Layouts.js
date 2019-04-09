import React, { Fragment } from 'react';

import { ContainerFluid } from './Grid';
import Navbar from './Navbar';

const WithNavbar = ({ children }) => (
  <Fragment>
    <ContainerFluid>
      <Navbar />
    </ContainerFluid>
    { children }
  </Fragment>
);

export default WithNavbar;
