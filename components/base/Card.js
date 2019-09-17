import React from 'react';
import styled from 'styled-components';

import { Card as DefaultCard, Icon } from 'antd';
import colors from '../../config/color';


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
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="edit" key="edit" />,
        <Icon type="ellipsis" key="ellipsis" />,
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
  margin-top: 16;
`;

export const SmallCard = styled.div`
  margin: 1em 0;
  border-radius: 10px;
  border: solid 2px ${colors.outline};
  background-color: ${colors.white};
`;

export default Card;
