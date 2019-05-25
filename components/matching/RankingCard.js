import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import ContainerRow, { Col } from '../base/Grid';
import Text, {
  TitleSmall, TitleSmallPrimary, Title, SubTitleSmall, TitlePrimary, ExtraSmallTextLightPrimary,
} from '../base/Text';
import { RankingAvatar } from '../base/Image';
import { SmallCard } from '../base/Card';
import Flex, { FlexCenter } from '../base/Flex';
import { CardButton } from '../base/Button';
import { InformationCollapse } from '../base/Collapse';

const CardLeft = ({ imagePath }) => (
  <RankingAvatar className="w-75 rounded-circle" src={imagePath || '/static/images/leo.png'} alt="leo-logo" />
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
  actionButton,
}) => (
  <FlexCenter className="h-100">
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
        <Col lg={2} className="text-center">
          <CardLeft imagePath={imagePath} rankingButton={rankingButton} />
        </Col>
        <Col lg={rankingButton ? 6 : 7}>
          <CardMiddle title={title} value={value} subtitle={subtitle} />
        </Col>
        { isEmpty(capacity)
          && (
            <Col lg={3} className="text-center">
              <CardRight actionButton={actionButton} />
            </Col>
          )
        }
        <CardCollapse isOpen={isOpen} />
      </ContainerRow>
      <CardButton className="mt-3 py-1 bg-white" onClick={() => toggle(!isOpen)}>
        <ExtraSmallTextLightPrimary className="mb-0">
          {
            !isOpen ? 'Show more' : 'Show less'
          }
        </ExtraSmallTextLightPrimary>
      </CardButton>
    </SmallCard>
  );
};

export default RankingCard;
