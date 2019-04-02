import React from 'react';

import env from '../../config/env';

import Text, { TitlePrimary, Paragraph, TextError } from '../base/Text';

const LandingIndex = () => (
  <React.Fragment>
    <TitlePrimary>Hello LEO !</TitlePrimary>
    <TextError>{ env.public.type }</TextError>
    <br />
    <TextError>{ env.public.matchingApi }</TextError>
    <hr />
    <TitlePrimary>Color</TitlePrimary>
    <TitlePrimary>Title Primary</TitlePrimary>
    <Text>Main Text</Text>
    <Paragraph>Paragraph Text</Paragraph>
    <TextError>Error Text</TextError>
  </React.Fragment>
);

export default LandingIndex;
