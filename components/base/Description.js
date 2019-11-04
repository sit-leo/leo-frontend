import React from 'react';
import { Descriptions } from 'antd';


export const ApplicantDescription = ({
  educations, telno, email,
}) => (
  <Descriptions title="Informations" bordered>
      <Descriptions.Item span={3} label="Major">{educations[0].major}</Descriptions.Item>
      <Descriptions.Item label="Tel no.">{telno}</Descriptions.Item>
      <Descriptions.Item label="Email">{email}</Descriptions.Item>
    </Descriptions>
);

export const RecruiterDescription = ({
  name, telno, email,
}) => (
  <Descriptions title="Informations" bordered>
      <Descriptions.Item span={3} label="Major">{name}</Descriptions.Item>
      <Descriptions.Item label="Tel no.">{telno}</Descriptions.Item>
      <Descriptions.Item label="Email">{email}</Descriptions.Item>
    </Descriptions>
);

export default Descriptions;
