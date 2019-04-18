import React from 'react';
import { storiesOf } from '@storybook/react';

import Text, {
  Title,
  TitlePrimary,
  TitleSmall,
  Paragraph,
  TextError,
  TitleLight,
  SubTitleSmall,
  EmptyInformationText
} from '../../../components/base/Text';

storiesOf('Base/Text', module)
  .add('Title', () => (
    <React.Fragment>
      <TitlePrimary>NavSelected_Kanit_30px_Regular_#58A4B0</TitlePrimary>
      <br/>
      <TitleLight>NavUnselected_Kanit_30px_Light_#373F51</TitleLight>
      <br/>
      <Title>TitleLarge_Kanit_30px_Regular_#373F51</Title>
      <br/>
      <TitleSmall>TitleSmall_Kanit_25px_Regular_#373F51</TitleSmall>
      <br/>
      <SubTitleSmall>SubTitleSmall_Kanit_25px_Light_#373F51</SubTitleSmall>
    </React.Fragment>
  ))
  .add('Text', () => (
    <React.Fragment>
      <Paragraph>Paragraph_Kanit_25px_Light_#1B1B1E</Paragraph>
      <br/>
      <EmptyInformationText>EmptyInformationText_Kanit_25px_LightItalic_#6A6F7A</EmptyInformationText>
      <br/>
      <Text>Span Text - Size Small</Text>
      <br/>
      <TextError>Span Text - Size Small - Color Error</TextError>
    </React.Fragment>
  ))