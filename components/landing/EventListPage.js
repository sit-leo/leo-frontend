import React, { Component } from 'react';
import WithNavbar from '../layouts/with-navbar';
import ContainerRow, { Col } from '../base/Grid';
import { Title } from '../base/Text';
import { EventCard } from '../base/Card';

export default class EventListPage extends Component {
  render() {
    return (
      <div>
        <WithNavbar>
          <ContainerRow>
            <Col lg={9} class="my-5">
              <Title>Last chance to join</Title>
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={4} class="my-5">
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4} class="my-5">
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
            <Col lg={4} class="my-5">
              <EventCard
                title="This is title"
                description="This is my description"
                src="../../static/images/match-mockup.jpg"
              />
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={9} class="my-5">
              <Title>Popular matching</Title>
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={3} class="my-3" />
          </ContainerRow>
          <ContainerRow>
            <Col lg={9} class="my-5">
              <Title>Latest matching</Title>
            </Col>
          </ContainerRow>
          <ContainerRow>
            <Col lg={3} class="my-3" />
          </ContainerRow>
        </WithNavbar>
      </div>
    );
  }
}
