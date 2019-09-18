import React, { Component } from 'react';
import WithNavbar from '../layouts/with-navbar';
import ContainerRow, { Col } from '../base/Grid';
import { Title, TitleSmall } from '../base/Text';
import { EventCard } from '../base/Card';

export default class EventListPage extends Component {
  render() {
    return (
      <div>
        <WithNavbar>
          <ContainerRow>
            <Col lg={9} className="mt-5">
              <Title>Last chance to join</Title>
              <TitleSmall>Don't miss the chance to join these matches.</TitleSmall>
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={9} className="mt-5">
              <Title>Popular matching</Title>
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={9} className="mt-5">
              <Title>Latest matching</Title>
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4}>
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
          </ContainerRow>
        </WithNavbar>
      </div>
    );
  }
}
