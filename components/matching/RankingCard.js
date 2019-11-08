import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import ContainerRow, { Col } from '../base/Grid';
import {
  TitleSmall,
  TitleSmallPrimary,
  Title,
  SubTitleSmall,
  ExtraSmallTextLightPrimary,
  InformationHeader,
  InformationDetail,
} from '../base/Text';
import { RankingAvatar } from '../base/Image';
import { SmallCard } from '../base/Card';
import Flex, { FlexCenter } from '../base/Flex';
import { CardButton } from '../base/Button';
import { InformationCollapse } from '../base/Collapse';
import { PreviewFile } from '../base/Upload';

const CardLeft = ({ imagePath, ...props }) => (
  <RankingAvatar src={imagePath || '/static/images/leo.png'} alt="leo-logo" {...props} />
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
  isFinished,
  informations = [{ header: 'No Informaiton', detail: '- none' }],
  files = [],
  position: {
    positionId,
    removePositionFile,
  },
}) => (
  <InformationCollapse className="mt-3 pt-3" isOpen={isOpen}>
    <ContainerRow>
      {
        informations.map(({ header, detail }) => (
          <Information key={header} header={header} detail={detail} />
        ))
      }
      <Col className="d-flex">
        {
          files.map(file => (
            <PreviewFile
              positionId={positionId}
              key={file.uid || file.id}
              fileId={file.id}
              removePositionFile={removePositionFile}
              fileName={file.fileName}
              isFinished={isFinished}
            />
          ))
        }
      </Col>
    </ContainerRow>
  </InformationCollapse>
);

const Information = ({ header, detail }) => (
  <Col>
    <InformationHeader>{ header }</InformationHeader>
    <InformationDetail>{ detail }</InformationDetail>
  </Col>
);

const RankingCard = ({
  title,
  value,
  subtitle,
  capacity,
  imagePath,
  actionButton,
  rankingButton,
  informations = [],
  files = [],
  sequence,
  position = {
    positionId: 0,
    removePositionFile: () => {},
  },
  isFinished,
}) => {
  const [isOpen, toggle] = useState(false);
  return (
    <SmallCard>
      <ContainerRow className="pt-4">
        { rankingButton && (
          <Col lg={2} className="d-flex align-items-center justify-content-center">
            { rankingButton }
          </Col>
        )}
        { sequence && (
          <Col lg={1} className="d-flex align-items-center justify-content-center">
            <SubTitleSmall>
              { sequence }
            </SubTitleSmall>
          </Col>
        )}
        <Col lg={2} className="d-flex align-items-center justify-content-center">
          <CardLeft className="rounded-circle w-75" imagePath={imagePath} rankingButton={rankingButton} />
        </Col>
        <Col lg={rankingButton ? 6 : 7} className="my-3">
          <CardMiddle title={title} value={value} subtitle={subtitle} />
        </Col>
        { isEmpty(capacity)
          && (
            <Col lg={rankingButton ? 2 : 3} className="text-center">
              <CardRight actionButton={actionButton} />
            </Col>
          )
        }
        <CardCollapse
          position={position}
          isOpen={isOpen}
          informations={informations}
          files={files}
          isFinished={isFinished}
        />
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
