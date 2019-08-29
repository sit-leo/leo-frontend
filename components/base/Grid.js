import React from 'react';
import styled from 'styled-components';

import {
  Container as ContainerDefault,
  Row as DefaultRow,
  Col as DefaultCol,
} from 'reactstrap';
import color from '../../config/color';

export const Col = ({
  xs = 12, md, lg, xl, children, ...props
}) => (
  <DefaultCol xs={xs} md={md} lg={lg} xl={xl} {...props}>
    { children }
  </DefaultCol>
);

export const Row = DefaultRow;

export const ContainerStyled = styled(ContainerDefault)`
  height: auto;
`;

export const ContainerPrimaryStyled = styled(ContainerDefault)`
  height: auto;
  background-color: ${color.primary};
`;

export const ContainerFluid = ({ children }) => (
  <ContainerStyled fluid>
    { children }
  </ContainerStyled>
);

export const ContainerFluidPrimary = ({ children }) => (
  <ContainerPrimaryStyled fluid>
    { children }
  </ContainerPrimaryStyled>
);

const ContainerRow = ({ children, className }) => (
  <ContainerStyled className={className} fluid={false}>
    <Row>
      { children }
    </Row>
  </ContainerStyled>
);

export default ContainerRow;
