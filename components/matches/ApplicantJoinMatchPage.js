import React from 'react';
import {
  Breadcrumb, Upload, Icon, Tag,
} from 'antd';

import WithNavbar from '../layouts/with-navbar';

import ContainerRow, { Col } from '../base/Grid';
import { TitleLarge, TitleMedium, SubTitleSmallWhite } from '../base/Text';
import { LabelInput, TextArea } from '../base/Input';
import { SmallMainButton } from '../base/Button';

const TitleForm = ({ title }) => (
  <Col>
    <hr />
    <TitleMedium className="mb-2">
      <b>{title}</b>
    </TitleMedium>
  </Col>
);

const UploadButton = () => (
  <div>
    <Icon type="plus" />
    <div className="ant-upload-text">Upload</div>
  </div>
);

const ApplicantJoinMatchPage = () => (
  <WithNavbar>
    <ContainerRow className="my-3">
      <Col>
        <Breadcrumb>
          <Breadcrumb.Item>
            Matchings
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Junior Programmer Match
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Join matching
          </Breadcrumb.Item>
        </Breadcrumb>
      </Col>
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
        <TextArea disabled value={'- Designer at Alchemist, 1 year\n- UX/UI Designer as an outsource, 5 months'} />
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
    </ContainerRow>
  </WithNavbar>
);

export default ApplicantJoinMatchPage;
