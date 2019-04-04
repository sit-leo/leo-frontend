import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../../components/base/Button';

storiesOf('Base/Button', module)
  .add('Main Button - Default with text', () => (
    <Button text="Default" />
  ))