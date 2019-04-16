import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Collapse } from 'reactstrap';

import Paragraph from 'antd/lib/typography/Paragraph';
import { addRank } from '../../store/match/applicant';

import ContainerRow, { Row, Col } from '../base/Grid';
import { TitleMedium, TextSmall } from '../base/Text';
import { Avatar } from '../base/Image';
import { SmallCard } from '../base/Card';
import Flex, { FlexCenter } from '../base/Flex';
import Button, { CardButton } from '../base/Button';
import color from '../../config/color';

const InformationCollapse = styled(Collapse)`
  border-color: ${color.disabled};
  border-style: solid;
  border-width: 1px 0 0 0;
  width: 100%;
`;

const Position = ({ position, addRank: addRanking = () => {} }) => {
  const [isOpen, toggle] = useState(false);
  return (
    <SmallCard>
      <ContainerRow className="pt-4">
        <Col lg={2}>
          <FlexCenter className="flex-column">
            <Avatar className="rounded-circle" src="/static/images/leo.png" alt="leo-logo" />
          </FlexCenter>
        </Col>
        <Col lg={7}>
          <Flex className="flex-column justify-content-center text-left">
            <TitleMedium>{position.name}</TitleMedium>
            <TextSmall>{position.salary || '฿15,000 - ฿20,000'}</TextSmall>
            <TextSmall>{position.location || 'Company name co., Ltd - Phayathai, BKK'}</TextSmall>
          </Flex>
        </Col>
        <Col lg={3}>
          <FlexCenter className="flex-column">
            <TitleMedium className="mb-0">{position.capacity}</TitleMedium>
            <TextSmall>Recruit</TextSmall>
            <Button
              className="mt-2"
              type="button"
              onClick={() => addRanking(position)}
            >
              Add to rank
            </Button>
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

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRank, dispatch),
});

export default connect(null, mapDispatchToPositionProps)(Position);
