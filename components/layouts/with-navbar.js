import React, { Fragment } from 'react';

import { ContainerFluid } from '../base/Grid';
import Navbar from '../base/Navbar';

const WithNavbar = ({ children }) => (
  <Fragment>
    <ContainerFluid>
      <Navbar />
    </ContainerFluid>
    { children }
  </Fragment>
);

export default WithNavbar;
