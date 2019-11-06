import React from 'react';

import AddMemberContainer from './AddMemberContainer';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Telno',
    dataIndex: 'telNo',
    key: 'telNo',
  },
];

const AddRecruiterPage = ({
  recruiters = [],
}) => (
  <AddMemberContainer
    title="Add recruiters"
    dataSource={recruiters}
    columns={columns}
  />
);

export default AddRecruiterPage;
