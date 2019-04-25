import React from 'react';

import Button, { DangerButton } from '../base/Button';

const ActionButton = ({
  isInRank,
  addRank = () => {},
  removeRank = () => {},
}) => (
  isInRank
    ? (
      <Button
        className="w-75"
        onClick={addRank}
      >
        Add to rank
      </Button>
    )
    : (
      <DangerButton
        className="w-75"
        onClick={removeRank}
      >
        Delete
      </DangerButton>
    )
);

export default ActionButton;
