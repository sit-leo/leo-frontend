import React from 'react';
import { storiesOf } from '@storybook/react';

import ContainerRow, { Col } from '../../../components/base/Grid'

import Card, { SmallCard } from '../../../components/base/Card';
import Button from '../../../components/base/Button';

import RankingCard from '../../../components/matching/RankingCard';

storiesOf('Base/Card', module)
  .add('Card Component', () => (
    <Card>Example Card</Card>
  ))
  .add('Small Card Component', () => (
    <SmallCard>Example Small Card</SmallCard>
  ))
  .add('Ranking Card Component', () => (
    <ContainerRow>
      <Col>
        <RankingCard
          title='Software Engineer'
          value='฿15,000 - ฿20,000'
          subtitle='Company name co., Ltd - Phayathai, BKK'
          capacity={3}
          actionButton={
            <Button>Add to rank</Button>
          }
        />
      </Col>
      <Col>
        <RankingCard
          title='Jirapa Songchom'
          value='GPAX 3.18'
          subtitle='School of Information Technology, KMUTT'
          capacity={3}
          imagePath={'/static/images/avatar.png'}
          badgeText='Documents'
          actionButton={
            <Button>Add to rank</Button>
          }
        />
      </Col>
    </ContainerRow>
  ))