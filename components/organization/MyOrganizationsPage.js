import React from 'react';
import styled from 'styled-components';
import { Card, Avatar } from 'antd';
import { connect } from 'react-redux';

import font from '../../config/font';
import color from '../../config/color';

import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col } from '../base/Grid';
import {
  TitleLargePrimary, TitleSmall, ExtraSmallText,
} from '../base/Text';
import { FlexCenter } from '../base/Flex';

const { Meta } = Card;

const image = 'data:image/png;base64,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';

const OrganizationCardStyled = styled(Card)`
  border-color: ${color.white};
  border-radius: 8px;
  box-shadow: 0 2px 15px 0 ${color.shadow};

  .ant-card-body {
    padding-left: .5rem;
    padding-right: .5rem;

    div {
      color: ${color.text.main} !important;
    }
    .ant-card-meta-title {
      font-size: ${font.size.medium};
    }
  }

  .ant-card-meta-detail > div:not(:last-child) {
    margin: 0;
  }

  .ant-card-actions {
    background: ${color.white};

    b, span {
      color: ${color.primary};
    }
    
    span {
      font-weight: lighter;
    }
  }
`;

const NumberBox = ({ number, text }) => (
  <FlexCenter className="flex-column">
    <TitleSmall className="mb-0">
      <b>{number}</b>
    </TitleSmall>
    <ExtraSmallText>
      <span style={{ fontWight: 'light' }}>{text}</span>
    </ExtraSmallText>
  </FlexCenter>
);

const OrganizationCard = ({
  organization: {
    name,
    description,
    numOfApplicant,
    numOfRecruiter,
  },
}) => (
  <OrganizationCardStyled
    className="w-100 px-2"
    actions={[
      <NumberBox number="412" text="Applicants" />,
      <NumberBox number="10" text="Recruiters" />,
    ]}
  >
    <Meta
      avatar={(
        <Avatar
          style={{ width: '75px', height: '75px' }}
          src={image}
        />
      )}
      title={name}
      description={description}
    />
  </OrganizationCardStyled>
);

const MyOrganizationsPage = ({ organizations = [] }) => (
  <WithNavbar>
    <ContainerRow>
      <Col>
        <TitleLargePrimary className="mt-3">
          My Organization
        </TitleLargePrimary>
        <hr />
      </Col>
      {
        organizations.map(organization => (
          <Col key={organization} lg={4} className="my-3">
            <OrganizationCard organization={organization} />
          </Col>
        ))
      }
    </ContainerRow>
  </WithNavbar>
);

const mapStateToProps = state => ({
  organizations: state.organization.organizations,
});

export default connect(mapStateToProps)(MyOrganizationsPage);
