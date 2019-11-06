import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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


const mapStateToProps = state => ({
  recruiters: state.organization.recruiters,
});

const mapDispatchToProps = dispatch => ({
  // setLoading: bindActionCreators(setLoadingAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecruiterPage);
