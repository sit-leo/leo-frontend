import styled from 'styled-components';

import { Collapse } from 'reactstrap';
import color from '../../config/color';

export default Collapse;

export const InformationCollapse = styled(Collapse)`
  border-color: ${color.disabled};
  border-style: solid;
  border-width: 1px 0 0 0;
  width: 100%;
`;
