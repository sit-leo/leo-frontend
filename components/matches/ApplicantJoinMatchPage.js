import React from 'react';
import {
  Upload, Icon, Tag,
} from 'antd';

import WithJoinMatch from '../layouts/join-match';

import { Col } from '../base/Grid';
import { TitleLarge, TitleForm, SubTitleSmallWhite } from '../base/Text';
import { LabelInput, TextArea } from '../base/Input';
import { SmallMainButton } from '../base/Button';

const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

const ApplicantJoinMatchPage = () => (
  <WithJoinMatch>
    <Col>
      <TitleLarge className="my-2">Junior Programmer Match</TitleLarge>
    </Col>
    <TitleForm title="Profile" />
    <Col lg={6}>
      <LabelInput label="Firstname" name="firstname" text="Jirapa" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Lastname" name="lastname" text="Songchom" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Email" name="email" text="jirapas.jil@gmail.com" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Phone Number" name="phoneNumber" text="0912121212" disabled />
    </Col>
    <TitleForm title="Education" />
    <Col lg={6}>
      <LabelInput label="University" name="university" text="King Mongkut's University of Technology Thinburi" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Year" name="year" text="3rd" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Major" name="major" text="Information Technology" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="GPAX" name="gpax" text="3.00" disabled />
    </Col>
    <TitleForm title="Skills" />
    <Col>
      {
        ['UX/U Design', 'Graphic Design', 'Wireframing'].map(tag => (
          <Tag key={tag}>
            {tag}
          </Tag>
        ))
      }
    </Col>
    <TitleForm title="Experiences" />
    <Col>
      <TextArea rows={3} value={'- Designer at Alchemist, 1 year\n- UX/UI Designer as an outsource, 5 months'} />
    </Col>
    <TitleForm title="Documents" />
    <Col>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={[]}
        onPreview={e => console.log(e)}
        onChange={e => console.log(e)}
      >
        <UploadButton />
      </Upload>
      <hr />
    </Col>
    <Col className="text-center my-4">
      <SmallMainButton>
        <SubTitleSmallWhite className="mb-0">
          Join Now
        </SubTitleSmallWhite>
      </SmallMainButton>
    </Col>
  </WithJoinMatch>
);

export default ApplicantJoinMatchPage;
