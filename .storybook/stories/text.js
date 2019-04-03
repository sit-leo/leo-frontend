import React from 'react';
import { storiesOf } from '@storybook/react';

import Text, { TitlePrimary, Paragraph, TextError } from '../../components/base/Text';

storiesOf('Base/Text', module)
  .add('Title Primary with text', () => (
    <TitlePrimary>Example Title</TitlePrimary>
  ))
  .add('Main Text with text', () => (
    <Text>Main Text</Text>
  ))
  .add('Paragraph with text', () => (
    <Paragraph>Paragraph Text</Paragraph>
  ))
  .add('TextError with text', () => (
    <TextError>Paragraph Text</TextError>
  ))