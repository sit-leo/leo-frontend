import React from 'react';
import { Title, TitleSmall } from '../base/Text';

const Finished = () => (
  <React.Fragment>
    <Title className="text-center">Finished !</Title>
    <TitleSmall className="text-center">
      {'Your rank is saved. Keep waiting for the match result.'}
      <br />
      {'We will notify you if the result is ready! '}
    </TitleSmall>
  </React.Fragment>
);

export default Finished;
