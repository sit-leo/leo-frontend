import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from '../../../components/base/Input';

storiesOf('Base/Input', module)
  .add('Input with text', () => (
    <Input text="Hello Input Placeholder" />
  ))