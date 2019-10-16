import React from 'react';

import AddMemberContainer from './AddMemberContainer';

const columns = [
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

const dataSource = [
  {
    key: '1',
    name: 'Facebook Thailand, Inc',
    location: 'Sukhumvit, BKK',
    telNo: '0912345678',
  },
  {
    key: '2',
    name: '0912345678',
    location: 'Sukhumvit, BKK',
    telNo: '0912345678',
  },
];

const AddRecruiterPage = ({
  recruiters = dataSource,
}) => (
  <AddMemberContainer
    title="Add recruiters"
    dataSource={recruiters}
    columns={columns}
  />
);

export default AddRecruiterPage;
