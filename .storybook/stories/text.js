import React from 'react';
import { storiesOf } from '@storybook/react';

import Text, { Title, TitlePrimary, TitleMedium, TitleSmall, TextSmall, Paragraph, TextError } from '../../components/base/Text';

storiesOf('Base/Text', module)
  .add('Title Large', () => (
    <Title>TitleLarge_Muli_34px_Regular_#373F51(nav menu unselected)</Title>
  ))
  .add('Title Large Primary', () => (
    <TitlePrimary>TitleLarge_Muli_34px_SemiBold_#58A4B0(nav menu selected) </TitlePrimary>
  ))
  .add('Title Medium', () => (
    <TitleMedium>TitleMedium_Muli_30px_SemiBold_#373F51</TitleMedium>
  ))
  .add('Title Small', () => (
    <TitleSmall>TitleSmall_Muli_25px_SemiBold_#373F51</TitleSmall>
  ))
  .add('Text Small', () => (
    <TextSmall>SubTitleSmall_Muli_25px_Regular_#373F51</TextSmall>
  ))
  .add('Text Main', () => (
    <Text>Main Text with <b>Span</b> Tag</Text>
  ))
  .add('Text Paragraph', () => (
    <Paragraph>Paragraph_Muli_20px_Regular_#1B1B1E</Paragraph>
  ))
  .add('Text Error', () => (
    <TextError>Paragraph Text</TextError>
  ))