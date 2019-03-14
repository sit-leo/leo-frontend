import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../components/base/Button';

storiesOf('Button', module)
  .add('Sample button with text', () => (
    <Button text="Hello Button" />
  ))