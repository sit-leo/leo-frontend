import React from 'react';
import WithNavbar from '../layouts/with-navbar';

const PositionList = ({ positions = [] }) => (
  <div>
    {
      positions.map(position => <div>{position.name}</div>)
    }
  </div>
);

const RecruiterPosition = () => (
  <WithNavbar>
    Recruiter Position
    <PositionList />
  </WithNavbar>
);

export default RecruiterPosition;
