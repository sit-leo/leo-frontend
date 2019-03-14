import React from 'react';

import Button from '../base/Button';

const UserIndex = ({
  user, getUserByUsername,
}) => (
  <React.Fragment>
    <h1>{ user.name }</h1>
    <h1>Landing Page</h1>
    <Button onClick={() => getUserByUsername('imgrbs')} text="Hello LEO!" />
  </React.Fragment>
);

export default UserIndex;
