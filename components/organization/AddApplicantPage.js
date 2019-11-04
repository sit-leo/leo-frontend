import React from 'react';

import AddMemberContainer from './AddMemberContainer';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'GPAX',
    dataIndex: 'educations[0].gpax',
    key: 'gpax',
  },
  {
    title: 'Education',
    dataIndex: 'educations[0].university',
    key: 'educations',
  },
];

export const dataSource = [
  {
    key: '1',
    name: 'Jirapa Songchom',
    educations: [
      {
        id: 1,
        university: "King Mongkut's University of Technology Thonburi",
        year: '4',
        major: 'Information Technology',
        gpax: '3.46',
      },
    ],
    telno: '0863476125',
    email: 'jirapas.jill@gmail.com',
  },
  {
    key: '2',
    name: 'Keerati Jearjindarat',
    educations: [
      {
        id: 2,
        university: "King Mongkut's University of Technology Thonburi",
        year: '4',
        major: 'Information Technology',
        gpax: '3.46',
      },
    ],
    telno: '099-456-2545',
    email: 'keerati.jear@gmail.com',
  },
];

const AddApplicantPage = ({
  applicants = dataSource,
}) => (
  <AddMemberContainer
      title="Add applicants"
      dataSource={applicants}
      columns={columns}
    />
);

export default AddApplicantPage;
