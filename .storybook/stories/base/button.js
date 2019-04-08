import React from 'react';
import { storiesOf } from '@storybook/react';
import Button, { DangerButton } from '../../../components/base/Button';

storiesOf('Base/Button', module)
  .add('Main Button - Default with text', () => (
    <Button>Default</Button>
  ))
  .add('Danger Button - Default with text', () => (
    <DangerButton>Default</DangerButton>
  ))