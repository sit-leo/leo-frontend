import React from 'react';
import { storiesOf } from '@storybook/react';
import Text, { TitlePrimary } from '../../components/base/Text';

storiesOf('Text', module)
  .add('Sample Title with text', () => (
    <TitlePrimary>Example Title</TitlePrimary>
  ))
  .add('Sample Text with text', () => (
    <Text>Example Text</Text>
  ))