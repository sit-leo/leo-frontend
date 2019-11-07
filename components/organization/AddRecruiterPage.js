import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';

import { clientInstance } from '../../tools/request';

import organizationAdapter from '../../store/organization/organization-adapter';

import { setLoading as setLoadingAction } from '../../store/global';
import { setRecruiters as setRecruitersAction } from '../../store/organization';

import { RecruiterDescription } from '../base/Description';

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
  setLoading = () => {},
  setRecruitersOrganization = () => {},
}) => {
  const [selectedRecruiters, setRecruiters] = useState([]);

  function onChange(selectedRowKeys) {
    setRecruiters(selectedRowKeys);
  }

  function submit() {
    setLoading(true);
    const organizationRequest = organizationAdapter(clientInstance());
    organizationRequest.addOrganizationRecruiters({
      idList: selectedRecruiters,
    })
      .then((response) => {
        if (!response.status) {
          message.success('Add applicants success.');
        } else {
          message.error('Add applicants failed.');
        }
        setRecruitersOrganization(
          recruiters.filter(({ applicantId }) => selectedRecruiters.find(id => id !== applicantId)),
        );
        setLoading(false);
      });
  }

  return (
    <AddMemberContainer
      title="Add recruiters"
      url="/organizations/recruiters/add"
      dataSource={recruiters}
      columns={columns}
      rowRender={RecruiterDescription}
      rowKey={record => record.recruiterId}
      onChange={onChange}
      submit={submit}
    />
  );
};


const mapStateToProps = state => ({
  recruiters: state.organization.recruiters,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  setRecruitersOrganization: bindActionCreators(setRecruitersAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecruiterPage);
