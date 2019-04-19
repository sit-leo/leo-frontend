import React, { useState } from 'react';

import ContainerRow, { Col } from '../base/Grid';
import Text, {
  TitleSmall, TitleSmallPrimary, Title, SubTitleSmall, TitlePrimary,
} from '../base/Text';
import { RankingAvatar } from '../base/Image';
import { SmallCard } from '../base/Card';
import Flex, { FlexCenter } from '../base/Flex';
import { CardButton } from '../base/Button';
import { InformationCollapse } from '../base/Collapse';

const CardLeft = ({ imagePath }) => (
  <RankingAvatar className="w-100 rounded-circle" src={imagePath || '/static/images/leo.png'} alt="leo-logo" />
);

const CardMiddle = ({
  title,
  value,
  subtitle,
}) => (
  <Flex className="flex-column justify-content-center text-left">
    <Title>{title || '-'}</Title>
    <TitleSmallPrimary>{value || '-'}</TitleSmallPrimary>
    <TitleSmall>{subtitle || '-'}</TitleSmall>
  </Flex>
);

const CardRight = ({
  capacity,
  badgeText,
  actionButton,
}) => (
  <FlexCenter className="flex-column">
    <TitlePrimary className="mb-0">{capacity || 0}</TitlePrimary>
    <SubTitleSmall className="mb-3">{badgeText || 'Recruit'}</SubTitleSmall>
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
  imagePath,
  badgeText,
  actionButton,
  rankingButton,
}) => {
  const [isOpen, toggle] = useState(false);
  return (
    <SmallCard>
      <ContainerRow className="pt-4">
        {
          rankingButton && <Col lg={1} className="d-flex align-items-center justify-content-center">{ rankingButton }</Col>
        }
        <Col lg={2}>
          <CardLeft imagePath={imagePath} rankingButton={rankingButton} />
        </Col>
        <Col lg={rankingButton ? 7 : 8}>
          <CardMiddle title={title} value={value} subtitle={subtitle} />
        </Col>
        <Col lg={2}>
          <CardRight capacity={capacity} badgeText={badgeText} actionButton={actionButton} />
        </Col>
        <CardCollapse isOpen={isOpen} />
      </ContainerRow>
      <CardButton className="mt-3 py-1" onClick={() => toggle(!isOpen)}>
        <TitleSmallPrimary className="mb-0">
          {
            !isOpen ? 'Show more' : 'Show less'
          }
        </TitleSmallPrimary>
      </CardButton>
    </SmallCard>
  );
};

export default RankingCard;
