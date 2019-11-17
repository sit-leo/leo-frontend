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
    render: (_, record) => (
      <React.Fragment>
        {`${record.telNo || record.telno}`}
      </React.Fragment>
    ),
  },
];

const AddRecruiterPage = ({
  recruiters = [],
  setLoading = () => {},
  setRecruitersOrganization = () => {},
}) => {
  const [selectedRecruiters, setSelectedRecruiters] = useState([]);

  function onChange(selectedRowKeys) {
    setSelectedRecruiters(selectedRowKeys);
  }

  function filterUnSelectedRecruiter({ recruiterId }) {
    const isSelected = selectedRecruiters.find(id => id === recruiterId);
    if (!isSelected) {
      return true;
    }
    return false;
  }

  async function submit() {
    setLoading(true);
    const organizationRequest = organizationAdapter(clientInstance());
    const response = await organizationRequest.addOrganizationRecruiters({
      idList: selectedRecruiters,
    });
    if (!response.error && selectedRecruiters.length > 0) {
      const unSelectedRecruiters = await recruiters.filter(filterUnSelectedRecruiter);
      await setRecruitersOrganization(unSelectedRecruiters);
      await setSelectedRecruiters([]);
      message.success('Add recruiters success.');
    } else {
      message.error('Add recruiters failed.');
    }
    setLoading(false);
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
