import React from 'react';

import env from '../../config/env';

const LandingIndex = () => (
  <React.Fragment>
    <h1>Hello LEO !</h1>
    <h3>{ env.public.type }</h3>
    <h3>{ env.public.api }</h3>
  </React.Fragment>
);

export default LandingIndex;
