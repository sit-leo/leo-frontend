import React from 'react';

import env from '../../config/env';

import { ContainerFluid } from '../base/Grid';
import { TitlePrimary, TextError } from '../base/Text';

const LandingIndex = () => (
  <ContainerFluid>
    <TitlePrimary>Hello LEO App !</TitlePrimary>
    <TextError>{ env.public.type }</TextError>
    <br />
    <TextError>{ env.public.matchingApi }</TextError>
    <hr />
  </ContainerFluid>
);

export default LandingIndex;
