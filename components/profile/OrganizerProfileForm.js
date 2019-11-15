import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  setOrganizer as setOrganizerAction,
} from '../../store/profile';

import {
  LabelInput,
} from '../base/Input';
import { Col } from '../base/Grid';

const OrganizerProfileForm = ({
  organizer,
  organizer: {
    name,
    description,
  },
  setOrganizer = () => {},
  getFieldDecorator,
}) => (
  <React.Fragment>
    <Col lg={8}>
      <LabelInput
        label="Organization name"
        name="name"
        text={name}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setOrganizer({ ...organizer, name: e.target.value })}
      />
    </Col>
    <Col>
      <LabelInput
        label="Description"
        name="description"
        text={description}
        getFieldDecorator={getFieldDecorator}
        onChange={e => setOrganizer({ ...organizer, description: e.target.value })}
      />
    </Col>
  </React.Fragment>
);

const mapStateToProps = state => ({
  organizer: state.profile.organizer,
});

const mapDispatchToProps = dispatch => ({
  setOrganizer: bindActionCreators(setOrganizerAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrganizerProfileForm);
