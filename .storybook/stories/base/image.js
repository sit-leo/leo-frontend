import React from 'react';
import { storiesOf } from '@storybook/react';
import Image, { RankingAvatar, ProfileAvatar, SmallProfileAvatar } from '../../../components/base/Image';

storiesOf('Base/Image', module)
  .add('Image', () => (
    <React.Fragment>
      Image
      <br />
      <Image src='/static/images/avatar.png'/>
      <hr />
      RankingAvatar
      <br />
      <RankingAvatar src='/static/images/avatar.png'/>
      <hr />
      ProfileAvatar
      <br />
      <ProfileAvatar src='/static/images/avatar.png'/>
      <hr />
      SmallProfileAvatar
      <br />
      <SmallProfileAvatar src='/static/images/avatar.png'/>
      <hr />
    </React.Fragment>
  ))