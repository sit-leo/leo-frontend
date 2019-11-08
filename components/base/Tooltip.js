import React from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';

import color from '../../config/color';

export const TooltipError = ({ ...props }) => (
  <Tooltip
    {...props}
    overlayClassName="tooltip-error"
  />
);

export default Tooltip;
