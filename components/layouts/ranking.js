import React from 'react';

import WithNavbar from './with-navbar';

import Hero from '../base/Hero';
import ContainerRow from '../base/Grid';

const Time = () => (
  <Hero>
    <img className="w-100" src="/static/images/time_mockup.png" alt="time-mockup" />
  </Hero>
);

const RankingLayout = ({ children }) => (
  <WithNavbar>
    <Time />
    <ContainerRow className="py-5">
      {children}
    </ContainerRow>
  </WithNavbar>
);

export default RankingLayout;
