import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setLoading } from '../../store/global';

import Form, { FormContainer } from '../base/Form';
import { SmallMainButton } from '../base/Button';
import { Col } from '../base/Grid';
import { LabelInput } from '../base/Input';
import { TitleForm } from '../base/Text';
import Modal from '../base/Modal';

const OrganizationForm = ({
  form: { validateFields, getFieldDecorator, resetFields },
  setLoading = () => { },
  submit = () => { },
}) => {
  const [isOpenConfirm, toggleConfirm] = useState(false);
  const [organization, setOrganization] = useState({});
  return (
    <FormContainer
      className="w-100 pb-4 px-4"
      onSubmit={(e) => {
        e.preventDefault();
        validateFields((err, values) => {
          if (!err) {
            setOrganization({
              user: {
                username: values.username,
                password: values.password,
              },
              organizationProfileDTO: {
                name: values.name,
                description: values.description,
              },
            });
            toggleConfirm(true);
          }
        });
      }}
    >
      <Col>
        <hr />
      </Col>
      <Col lg={6}>
        <LabelInput
          label="Username"
          name="username"
          getFieldDecorator={getFieldDecorator}
        />
      </Col>
      <Col lg={6}>
        <LabelInput
          label="Password"
          name="password"
          type="password"
          getFieldDecorator={getFieldDecorator}
        />
      </Col>
      <TitleForm title="Profile" />
      <Col lg={8}>
        <LabelInput
          label="Organization name"
          name="name"
          getFieldDecorator={getFieldDecorator}
        />
      </Col>
      <Col>
        <LabelInput
          label="Description"
          name="description"
          getFieldDecorator={getFieldDecorator}
        />
      </Col>
      <Col className="text-center">
        <SmallMainButton htmlType="submit" className="my-3 w-25 mx-auto">
          Create Organization
        </SmallMainButton>
      </Col>
      <Modal
        isOpenModal={isOpenConfirm}
        onClose={() => toggleConfirm(false)}
        options={{
          header: 'Organization Confirmation',
          body: `Are you sure to create new organization?
            Please check the information before confirming.`,
          footer: 'You can\'t change password of organization after confirm. please copy and send to organizer.',
        }}
        onConfirm={async () => {
          toggleConfirm(false);
          setLoading(true);
          await submit(organization);
          resetFields();
          setLoading(false);
        }}
      />
    </FormContainer>
  );
};

const WrappedOrganizationForm = Form.create({ name: 'organization_form' })(OrganizationForm);

const mapDispatchToProps = dispatch => ({
  setLoading: bindActionCreators(setLoading, dispatch),
});

export default connect(null, mapDispatchToProps)(WrappedOrganizationForm);
