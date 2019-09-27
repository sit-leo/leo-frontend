import React from 'react';
import { storiesOf } from '@storybook/react';
import Button, {
  DangerButton,
  SmallMainButton,
  SmallButton,
  CardButton,
  MainButtonLight,
} from '../../../components/base/Button';

storiesOf('Base/Button', module)
  .add('Main Button - Default with text', () => (
    <React.Fragment>
      <Button>Button</Button>
      <br />
      <br />
      <MainButtonLight>Button</MainButtonLight>
      <br />
      <br />
      <SmallMainButton>SmallMainButton</SmallMainButton>
      <br />
      <br />
      <SmallButton>SmallButton</SmallButton>
    </React.Fragment>
  ))
  .add('Danger Button - Default with text', () => (
    <DangerButton>DangerButton</DangerButton>
  ))
  .add('Card Button - Default with text', () => (
    <CardButton>CardButton</CardButton>
  ))