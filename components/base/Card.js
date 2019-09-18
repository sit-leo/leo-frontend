import React from 'react';
import styled from 'styled-components';

import {
  Card as DefaultCard, Icon, Row, Divider,
} from 'antd';
import SmallButton from './Button';
import ContainerRow, { Col } from './Grid';
import { FlexCenter } from './Flex';

import colors from '../../config/color';
import { TitleSmallPrimary, TitlePrimary, ExtraSmallText } from './Text';


const CardContaier = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 50px 0 ${colors.shadow};
  background-color: ${colors.white};
  width: 100%;
  height: auto;
  padding: 1.5em;
`;

const Card = ({ children, ...props }) => (
  <CardContaier {...props}>
    {children}
  </CardContaier>
);

const { Meta } = DefaultCard;

const ShowAmount = ({ count, badgeText, ...props }) => (
  <FlexCenter className="flex-column">
    <ExtraSmallText>
      {count}
    </ExtraSmallText>
    <ExtraSmallText {...props}>
      {badgeText}
    </ExtraSmallText>
  </FlexCenter>
);

export const EventCard = ({
  children, title, description, src,
}) => (
  <PlainCard
      cover={(
        <img
          alt="example"
          src={src}
        />
      )}
    >
      <Meta
        title={title}
        description={description}
      />
      <Divider />
      <ContainerRow>
        <ShowAmount count={19} badgeText="Recruiters" />
        <ShowAmount count={19} badgeText="Applicants" />
        <SmallButton className="w-25">Detail</SmallButton>
      </ContainerRow>

      {children}
    </PlainCard>
);

const PlainCard = styled(DefaultCard)`
  width: 100%;
  margin-top: 16;
`;

export const SmallCard = styled.div`
  margin: 1em 0;
  border-radius: 10px;
  border: solid 2px ${colors.outline};
  background-color: ${colors.white};
`;

export default Card;
