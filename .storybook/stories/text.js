import React from 'react';
import { storiesOf } from '@storybook/react';
import Text, { Title } from '../../components/base/Text';

storiesOf('Text', module)
  .add('Sample Title with text', () => (
    <Title>Example Title</Title>
  ))
  .add('Sample Text with text', () => (
    <Text>Example Text</Text>
  ))