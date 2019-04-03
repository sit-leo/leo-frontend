import React from 'react';

import env from '../../config/env';

import Container from '../base/Container';
import { TitlePrimary, TextError } from '../base/Text';

const LandingIndex = () => (
  <Container>
    <TitlePrimary>Hello LEO !</TitlePrimary>
    <TextError>{ env.public.type }</TextError>
    <br />
    <TextError>{ env.public.matchingApi }</TextError>
    <hr />
  </Container>
);

export default LandingIndex;
