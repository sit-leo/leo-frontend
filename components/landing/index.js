import React from 'react';
import { connect } from 'react-redux';

import { clientInstance } from '../../tools/request';

import userAdapter from '../../store/user/user-adapter';

import { setRole, setId } from '../../store/user';

import WithNavbar from '../layouts/with-navbar';

import EnvDebugger from '../base/Debugger';
import { ContainerFluid, Row, Col } from '../base/Grid';
import { TitlePrimary } from '../base/Text';
import Card from '../base/Card';
import { RankingAvatar } from '../base/Image';
import { FlexCenter } from '../base/Flex';

const userRequest = userAdapter(clientInstance());

const LandingIndex = ({ role, setUser }) => {
  userRequest.getUser().then(user => setUser(user));
  return (
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
          <EnvDebugger role={role} />
        </Row>
      </ContainerFluid>
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
