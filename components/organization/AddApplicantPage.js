import React from 'react';

import AddMemberContainer from './AddMemberContainer';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => (
      <React.Fragment>
        {`${record.firstName} ${record.lastName}`}
      </React.Fragment>
    ),
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

const AddApplicantPage = ({
  applicants = [],
}) => (
  <AddMemberContainer
    title="Add applicants"
    dataSource={applicants}
    columns={columns}
  />
);

export default AddApplicantPage;
