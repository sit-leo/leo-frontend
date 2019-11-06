import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    url="/organizations/applicants/add"
  />
);


const mapStateToProps = state => ({
  applicants: state.organization.applicants,
});

const mapDispatchToProps = dispatch => ({
  // setLoading: bindActionCreators(setLoadingAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddApplicantPage);
