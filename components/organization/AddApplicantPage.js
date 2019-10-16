import React from 'react';

import AddMemberContainer from './AddMemberContainer';

const columns = [
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

const dataSource = [
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
