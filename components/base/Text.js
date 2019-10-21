import React from 'react';
import styled from 'styled-components';

import colors from '../../config/color';
import font from '../../config/font';

import { Col } from './Grid';

const Text = styled.span`
  font-weight: ${font.weight.regular};
  font-size: ${font.size.small};
  color: ${colors.text.paragraph};
`;

export default Text;

export const Title = styled.h1`
  font-size: ${font.size.medium};
  color: ${colors.text.main};
  font-weight: ${font.weight.regular};
`;

export const TitleLarge = styled.h1`
  font-size: ${font.size.xlarge};
  color: ${colors.text.main};
  font-weight: ${font.weight.regular};
`;

export const TitleLargeWhite = styled(TitleLarge)`
  color: ${colors.white};
`;

export const TitleLargePrimary = styled(TitleLarge)`
  color: ${colors.primary};
`;

export const TitlePrimary = styled(Title)`
  color: ${colors.primary};
`;

export const TitleError = styled(Title)`
  color: ${colors.error};
`;

export const TitleWhite = styled(Title)`
  color: ${colors.white};
`;

export const SubTitleStatistic = styled(TitleWhite)`
  font-weight: 100;
`;

export const TitleLight = styled(Title)`
  font-weight: ${font.weight.light};
`;

export const TitleMedium = styled.h2`
  font-size: ${font.size.medium};
  color: ${colors.text.main};
  font-weight: ${font.weight.light};
`;

export const TitleSmall = styled.h2`
  font-size: ${font.size.small};
  color: ${colors.text.main};
  font-weight: ${font.weight.light};
`;

export const SubTitleWhite = styled.h2`
  font-size: ${font.size.small};
  color: ${colors.white};
  font-weight: ${font.weight.light};
`;

export const TitleSmallPrimary = styled(TitleMedium)`
  color: ${colors.primary};
`;

export const TitleSmallWhite = styled(TitleMedium)`
  color: ${colors.white};
`;

export const SubTitleSmall = styled.h2`
  font-size: ${font.size.large};
  color: ${colors.text.main};
  font-weight: ${font.weight.light};
`;

export const SubTitleSmallWhite = styled(SubTitleSmall)`
  color: ${colors.white};
`;

export const NavSelected = styled.h2`
  font-size: ${font.size.medium};
  font-weight: ${font.weight.light};
  color: ${colors.primary};
  margin-right: 1.3em;
  margin-bottom: 0;
  cursor: pointer;
`;


export const Paragraph = styled.p`
  font-size: ${font.size.medium};
  color: ${colors.text.paragraph};
  font-weight: ${font.weight.light};
  margin: 0;
`;

export const ThinParagraph = styled.p`
  font-size: ${font.size.small};
  color: ${colors.text.paragraph};
  font-weight: ${font.weight.thin};
  margin: 0;
`;

export const TextError = styled(Text)`
  color: ${colors.error};
`;

export const EmptyInformationText = styled(Text)`
  color: ${colors.secondary};
  font-style: italic;
`;

export const ExtraSmallText = styled(Text)`
  font-size: ${font.size.xsmall};
`;

export const ExtraSmallTextLight = styled(Text)`
  font-size: ${font.size.xsmall};
  font-weight: ${font.weight.light};
`;

export const ExtraSmalLightWhite = styled(Text)`
  font-size: ${font.size.xsmall};
  font-weight: ${font.weight.light};
  color: ${colors.white};
`;


export const TitleForm = ({ title }) => (
  <Col>
    <hr />
    <TitleMedium className="mb-2">
      <b>{title}</b>
    </TitleMedium>
  </Col>
);

export const ExtraSmallTextLightPrimary = styled(ExtraSmallTextLight)`
  color: ${colors.primary};
`;

export const NoteText = styled.span`
  color: ${colors.secondary};
  font-size: ${font.size.xsmall};
`;

export const InformationHeader = styled.h1`
  color: ${colors.text.main};
  font-size: ${font.size.medium};
`;

export const InformationDetail = styled.h2`
  color: ${colors.text.main};
  font-size: ${font.size.small};
  font-weight: ${font.weight.light};
  margin-left: 30px;
  white-space: pre-wrap;
`;
