import React from 'react';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import { setRole, setId } from '../../store/user';

import WithNavbar from '../layouts/with-navbar';

import EnvDebugger from '../base/Debugger';
import ContainerRow, { ContainerFluidPrimary, Row, Col } from '../base/Grid';
import { SubTitleSmall , TitleLarge, TitleLight, TitleSmall, Paragraph, TitleSmallWhite, ExtraSmallTextLight } from '../base/Text';
import MainButton from '../base/Button';
import Card from '../base/Card';
import { RankingAvatar } from '../base/Image';
import { FlexCenter } from '../base/Flex';
import { from } from 'rxjs';

const userRequest = userAdapter(clientInstance());

const LandingIndex = ({ role, setUser }) => {
  userRequest.getUser().then(user => setUser(user));
  return (
    <WithNavbar>
      <ContainerRow>
          <Col lg={5} className="my-5">
            <TitleLarge>We are LEO</TitleLarge>
            <SubTitleSmall>A land that easy to find the opportunities.</SubTitleSmall>
            <Paragraph className="my-5">You will get the best match here. Ranking them by yourself and let we match them for you. We guarantee the best result by using Deferred Acceptance Algorithm, awarded the Nobel prize of Economic Sciences in Memory of Alfred Nobel 2012.</Paragraph>
            <MainButton className="width-100">Register</MainButton>
          </Col>
          <Col lg={7}>
            <img className="w-100" src="/static/images/girl-boy-landing.png"/>
          </Col>
      </ContainerRow>
      <ContainerFluidPrimary>
        <ContainerRow className="py-5">
          
            <Col lg={4} className="py-3">
            <center>
              <img className="w-25" src="/static/images/leo.png"/>
              <TitleSmall className="my-2">We do the matching for you.</TitleSmall>
              <ExtraSmallTextLight className="my-2">We serve you the generic matching here.  </ExtraSmallTextLight>
            </center>
            </Col>

            <Col lg={4} className="py-3">
            <center>
              <img className="w-25" src="/static/images/leo.png"/>
              <TitleSmall className="my-2">You rank. Then, we match them.</TitleSmall>
              <ExtraSmallTextLight className="my-2">We use your rank and match them with 
the other rank by deferred acceptance algorithms  </ExtraSmallTextLight>
            </center>
            </Col>

            <Col lg={4} className="py-3">
            <center>
              <img className="w-25" src="/static/images/leo.png"/>
              <TitleSmall className="my-2">We use Deferred Acceptance Algorithm.</TitleSmall>
              <ExtraSmallTextLight className="my-2">Awarded the Nobel prize of Economic Sciences in Memory of Alfred Nobel 2012.  </ExtraSmallTextLight>
            </center>
            </Col>
            

          
        </ContainerRow>
        
        <Row>
          
          <EnvDebugger role={role} />
        </Row>
      </ContainerFluidPrimary>
    </WithNavbar>
  );
};

const mapStateToProps = state => ({
  role: state.user.role,
});

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    dispatch(setId(user.id));
    dispatch(setRole(user.role));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingIndex);
