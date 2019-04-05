import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
`;

export default Flex;

export const FlexBetween = styled(Flex)`
  justify-content: space-between;
`;

export const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
