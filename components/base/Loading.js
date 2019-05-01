import React from 'react';
import styled from 'styled-components';

import color from '../../config/color';
import font from '../../config/font';

import { FlexCenter } from './Flex';
import Icon from './Icon';

const LoadingContainer = styled(FlexCenter)`
    min-height: 100vh;
    min-width: 100vw;
    display: ${props => (props.loading ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.25);
`;

const Loading = ({ loading }) => (
  <LoadingContainer loading={loading}>
    <Icon
      style={{ color: color.white, fontSize: '50px' }}
      spin
      type="loading-3-quarters"
    />
  </LoadingContainer>
);

export default Loading;
