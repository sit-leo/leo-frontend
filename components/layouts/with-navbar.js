import React, { Fragment } from 'react';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import Navbar from '../base/Navbar';

const userRequest = userAdapter(clientInstance());

function logout() {
  userRequest.logout();
}

const WithNavbar = ({ children }) => (
  <Fragment>
    <Navbar logout={() => logout()} />
    { children }
  </Fragment>
);

export default WithNavbar;
