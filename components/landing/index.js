import React from 'react';
import { connect } from 'react-redux';

import WithNavbar from '../layouts/with-navbar';

import EnvDebugger from '../base/Debugger';
import ContainerRow, { ContainerFluidPrimary, Row, Col } from '../base/Grid';
import {
  SubTitleSmall, TitleLarge, ThinParagraph, TitleSmallWhite, ExtraSmalLightWhite,
} from '../base/Text';
import MainButton from '../base/Button';


const LandingIndex = ({ role }) => (
  <WithNavbar>
    <ContainerRow>
      <Col lg={5} className="my-5">
        <TitleLarge>We are LEO</TitleLarge>
        <SubTitleSmall>A land that easy to find the opportunities.</SubTitleSmall>
        <ThinParagraph className="my-3 mb-5">You will get the best match here. Ranking them by yourself and let we match them for you. We guarantee the best result by using Deferred Acceptance Algorithm, awarded the Nobel prize of Economic Sciences in Memory of Alfred Nobel 2012.</ThinParagraph>
        <MainButton className="w-75">Register</MainButton>
      </Col>
      <Col lg={7} className="d-flex align-items-end">
        <img alt="girl-boy-landing" className="w-100" src="/static/images/girl-boy-landing.png" />
      </Col>
    </ContainerRow>
    <ContainerFluidPrimary>
      <ContainerRow className="py-5">
        <Col lg={4} className="py-3">
          <center>
            <img alt="leo-logo" className="w-25" src="/static/images/matching.png" />
            <TitleSmallWhite className="my-3">We do the matching for you.</TitleSmallWhite>
            <ExtraSmalLightWhite className="my-2">We serve you the generic matching here.  </ExtraSmalLightWhite>
          </center>
        </Col>
        <Col lg={4} className="py-3">
          <center>
            <img alt="leo-logo" className="w-25" src="/static/images/ranking.png" />
            <TitleSmallWhite className="my-3">You rank. Then, we match them.</TitleSmallWhite>
            <ExtraSmalLightWhite className="my-2">
              We use your rank and match them with
              the other rank by deferred acceptance algorithms
              {' '}

            </ExtraSmalLightWhite>
          </center>
        </Col>
        <Col lg={4} className="py-3">
          <center>
            <img alt="leo-logo" className="w-25" src="/static/images/nobel.png" />
            <TitleSmallWhite className="my-3">We use Deferred Acceptance Algorithm.</TitleSmallWhite>
            <ExtraSmalLightWhite className="my-2">Awarded the Nobel prize of Economic Sciences in Memory of Alfred Nobel 2012.  </ExtraSmalLightWhite>
          </center>
        </Col>
      </ContainerRow>
      <Row>
        <EnvDebugger role={role} />
      </Row>
    </ContainerFluidPrimary>
  </WithNavbar>
);

const mapStateToProps = state => ({
  role: state.user.role,
});

export default connect(mapStateToProps)(LandingIndex);
