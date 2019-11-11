import React from 'react';
import styled from 'styled-components';

import {
  Card as DefaultCard, Spin, Icon,
} from 'antd';
import MainButton from './Button';
import { FlexCenter } from './Flex';

import colors from '../../config/color';
import { ExtraSmallTextLight, ExtraSmallText } from './Text';


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
    <ExtraSmallTextLight {...props}>
      {badgeText}
    </ExtraSmallTextLight>
  </FlexCenter>
);

export const EventCard = ({
  id, children, title, description, numOfApplicant, numOfRecruiter, src, loading,
}) => (
  <PlainCard
      loading={loading}
      className="my-2"
      cover={(
        <img
          alt="example"
          src={src}
        />
      )}
      actions={
        loading
          ? [<Spin indicator={<Icon type="loading" style={{ fontSize: 24, color: colors.primary }} spin />} />]
          : [
            <ShowAmount count={numOfRecruiter} badgeText="Recruiters" />,
            <ShowAmount count={numOfApplicant} badgeText="Applicants" />,
            <a href={`/matches/${id}`}>
              <MainButton className="w-100">Detail</MainButton>
            </a>,
          ]}
    >
      <Meta
        title={title}
        description={description}
      />
      {children}
    </PlainCard>
);

const PlainCard = styled(DefaultCard)`
  width: 100%;
  margin-top: 16px;
`;

export const SmallCard = styled.div`
  margin: 1em 0;
  border-radius: 10px;
  border: solid 2px ${colors.outline};
  background-color: ${colors.white};
`;

export default Card;
