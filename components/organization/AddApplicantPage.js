import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';

import { clientInstance } from '../../tools/request';

import organizationAdapter from '../../store/organization/organization-adapter';

import { setLoading as setLoadingAction } from '../../store/global';
import { setApplicants as setApplicantsAction } from '../../store/organization';

import { ApplicantDescription } from '../base/Description';

import AddMemberContainer from './AddMemberContainer';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => {
      if (record.firstName) {
        return (
          <React.Fragment>
            {`${record.firstName} ${record.lastName}`}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          {`${record.name}`}
        </React.Fragment>
      );
    },
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
  setLoading = () => { },
  setApplicantsOrganization = () => { },
}) => {
  const [selectedApplicants, setApplicants] = useState([]);

  function onChange(selectedRowKeys) {
    setApplicants(selectedRowKeys);
  }

  function filterUnSelectedApplicant({ applicantId }) {
    const isSelected = selectedApplicants.find(id => id === applicantId);
    if (!isSelected) {
      return true;
    }
    return false;
  }

  async function submit() {
    setLoading(true);
    const organizationRequest = organizationAdapter(clientInstance());
    const response = await organizationRequest.addOrganizationApplicants({
      idList: selectedApplicants,
    });
    if (!response.status && selectedApplicants.length > 0) {
      const unSelectedApplicants = await applicants.filter(filterUnSelectedApplicant);
      await setApplicantsOrganization(unSelectedApplicants);
      await setApplicants([]);
      message.success('Add applicants success.');
    } else {
      message.error('Add applicants failed.');
    }
    setLoading(false);
  }

  return (
    <AddMemberContainer
      title="Add applicants"
      url="/organizations/applicants/add"
      dataSource={applicants}
      columns={columns}
      rowRender={ApplicantDescription}
      rowKey={record => record.applicantId}
      onChange={onChange}
      submit={submit}
    />
  );
};


const mapStateToProps = state => ({
  applicants: state.organization.applicants,
});

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoadingAction, dispatch),
  setApplicantsOrganization: bindActionCreators(setApplicantsAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddApplicantPage);
