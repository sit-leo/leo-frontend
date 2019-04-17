import React from 'react';

import env from '../../config/env';

import WithNavbar from '../layouts/with-navbar';

import { ContainerFluid, Row, Col } from '../base/Grid';
import { TitlePrimary, TextError } from '../base/Text';
import Card from '../base/Card';
import { RankingAvatar } from '../base/Image';
import Flex, { FlexCenter } from '../base/Flex';

const LandingIndex = () => (
  <WithNavbar>
    <ContainerFluid>
      <Row>
        <Col className="my-5">
          <Card style={{ minHeight: '25vh' }}>
            <FlexCenter className="flex-column">
              <RankingAvatar src="/static/images/leo.png" />
              <TitlePrimary>We are LEO!</TitlePrimary>
            </FlexCenter>
          </Card>
        </Col>
        <Col>
          <Card>
            ENV Debugger
            <hr />
            <Flex className="flex-column">
              <TextError>{ env.public.type }</TextError>
              <TextError>{ env.public.matchingApi }</TextError>
            </Flex>
          </Card>
        </Col>
      </Row>
    </ContainerFluid>
  </WithNavbar>
);

export default LandingIndex;
