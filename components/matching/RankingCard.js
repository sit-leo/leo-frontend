import React, { useState } from 'react';

import ContainerRow, { Col } from '../base/Grid';
import Text, { TitleSmall } from '../base/Text';
import { RankingAvatar } from '../base/Image';
import { SmallCard } from '../base/Card';
import Flex, { FlexCenter } from '../base/Flex';
import { CardButton } from '../base/Button';
import { InformationCollapse } from '../base/Collapse';

const CardLeft = ({ rankingButton }) => (
  <FlexCenter>
    { rankingButton }
    <RankingAvatar className="rounded-circle" src="/static/images/leo.png" alt="leo-logo" />
  </FlexCenter>
);

const CardMiddle = ({
  title,
  value,
  subtitle,
}) => (
  <Flex className="flex-column justify-content-center text-left">
    <TitleSmall>{title || '-'}</TitleSmall>
    <Text>{value || '-'}</Text>
    <Text>{subtitle || '-'}</Text>
  </Flex>
);

const CardRight = ({
  capacity,
  badgeText,
  actionButton,
}) => (
  <FlexCenter className="flex-column">
    <TitleSmall className="mb-0">{capacity || 0}</TitleSmall>
    <Text>{badgeText || 'Recruit'}</Text>
    { actionButton }
  </FlexCenter>
);

const CardCollapse = ({
  isOpen,
  informations = [{ header: 'No Informaiton', detail: '- none' }],
}) => (
  <InformationCollapse className="mt-3 pt-3" isOpen={isOpen}>
    <ContainerRow>
      {
        informations.map(({ header, detail }) => (
          <Information key={header} header={header} detail={detail} />
        ))
      }
    </ContainerRow>
  </InformationCollapse>
);

const Information = ({ header, detail }) => (
  <Col>
    <TitleSmall>{ header }</TitleSmall>
    <Text>{ detail }</Text>
  </Col>
);

const RankingCard = ({
  title,
  value,
  subtitle,
  capacity,
  badgeText,
  actionButton,
  rankingButton,
}) => {
  const [isOpen, toggle] = useState(false);
  return (
    <SmallCard>
      <ContainerRow className="pt-4">
        <Col lg={rankingButton ? 3 : 2}>
          <CardLeft rankingButton={rankingButton} />
        </Col>
        <Col lg={rankingButton ? 6 : 7}>
          <CardMiddle title={title} value={value} subtitle={subtitle} />
        </Col>
        <Col lg={3}>
          <CardRight capacity={capacity} badgeText={badgeText} actionButton={actionButton} />
        </Col>
        <CardCollapse isOpen={isOpen} />
      </ContainerRow>
      <CardButton className="mt-3" onClick={() => toggle(!isOpen)}>
        {
          !isOpen ? 'Show more' : 'Show less'
        }
      </CardButton>
    </SmallCard>
  );
};

export default RankingCard;
