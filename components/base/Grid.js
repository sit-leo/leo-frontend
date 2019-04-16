import React from 'react';
import styled from 'styled-components';

import {
  Container as ContainerDefault,
  Row as DefaultRow,
  Col as DefaultCol,
} from 'reactstrap';

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

export const ContainerFluid = ({ children }) => (
  <ContainerStyled fluid>
    { children }
  </ContainerStyled>
);

const ContainerRow = ({ children, className }) => (
  <ContainerStyled className={className} fluid={false}>
    <Row>
      { children }
    </Row>
  </ContainerStyled>
);

export default ContainerRow;
