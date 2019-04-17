import React, { useState } from 'react';
import styled from 'styled-components';

import { Collapse } from 'reactstrap';

import Paragraph from 'antd/lib/typography/Paragraph';

import ContainerRow, { Col } from '../base/Grid';
import { TitleMedium, TextSmall } from '../base/Text';
import { RankingAvatar } from '../base/Image';
import { SmallCard } from '../base/Card';
import Flex, { FlexCenter } from '../base/Flex';
import { CardButton } from '../base/Button';
import color from '../../config/color';

const InformationCollapse = styled(Collapse)`
  border-color: ${color.disabled};
  border-style: solid;
  border-width: 1px 0 0 0;
  width: 100%;
`;

const Position = ({
  position,
  actionButton,
  rankingButton,
}) => {
  const [isOpen, toggle] = useState(false);
  return (
    <SmallCard>
      <ContainerRow className="pt-4">
        <Col lg={rankingButton ? 3 : 2}>
          <FlexCenter>
            { rankingButton }
            <RankingAvatar className="rounded-circle" src="/static/images/leo.png" alt="leo-logo" />
          </FlexCenter>
        </Col>
        <Col lg={rankingButton ? 6 : 7}>
          <Flex className="flex-column justify-content-center text-left">
            <TitleMedium>{position.name}</TitleMedium>
            <TextSmall>{position.salary}</TextSmall>
            <TextSmall>{position.location}</TextSmall>
          </Flex>
        </Col>
        <Col lg={3}>
          <FlexCenter className="flex-column">
            <TitleMedium className="mb-0">{position.capacity || 0}</TitleMedium>
            <TextSmall>Recruit</TextSmall>
            { actionButton }
          </FlexCenter>
        </Col>

        <InformationCollapse className="mt-3 pt-3" isOpen={isOpen}>
          <ContainerRow>
            <Col>
              <TitleMedium>No Information</TitleMedium>
              <Paragraph>
                - none
              </Paragraph>
            </Col>
          </ContainerRow>
        </InformationCollapse>
      </ContainerRow>

      <CardButton className="mt-3" onClick={() => toggle(!isOpen)}>
        {
          !isOpen ? 'Show more' : 'Show less'
        }
      </CardButton>
    </SmallCard>
  );
};

export default Position;
