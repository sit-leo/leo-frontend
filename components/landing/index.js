import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

import env from '../../config/env';

import cookie from '../../tools/cookie';
import WithNavbar from '../layouts/with-navbar';

import { ContainerFluid, Row, Col } from '../base/Grid';
import Text, { TitlePrimary, TitleLarge, TextError } from '../base/Text';
import Card from '../base/Card';
import { RankingAvatar } from '../base/Image';
import Flex, { FlexCenter } from '../base/Flex';

const linksDebug = [
  {
    name: 'Applicant Ranking',
    path: '/matches/1/applicants/ranking',
  },
  {
    name: 'Recruiter Position',
    path: '/matches/1/recruiters/positions',
  },
  {
    name: 'Recruiter Ranking',
    path: '/matches/1/positions/1/ranking',
  },
  {
    name: 'Login',
    path: '/login',
  },
];

const LandingIndex = ({ role }) => (
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
              <TitleLarge>
                {`Role: ${role || 'guest'}`}
              </TitleLarge>
              <TextError>{ env.public.type }</TextError>
              <TextError>{ env.public.matchingApi }</TextError>
              <TextError>{ env.public.matchApi }</TextError>
              <TextError>{ env.public.userApi }</TextError>
              {
                linksDebug.map(menu => (
                  <Link key={menu.name} href={menu.path}>
                    <a href="#">
                      <Text>{menu.name}</Text>
                    </a>
                  </Link>
                ))
              }
              <Text onClick={() => cookie.clearToken()}>Logout</Text>
            </Flex>
          </Card>
        </Col>
      </Row>
    </ContainerFluid>
  </WithNavbar>
);

const mapStateToProps = state => ({
  role: state.user.role,
});

export default connect(mapStateToProps)(LandingIndex);
