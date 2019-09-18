import React from 'react';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  addRecruiterPosition as addRecruiterPositionAction,
} from '../../store/matching/join';

import WithJoinMatch from '../layouts/join-match';

import { Col } from '../base/Grid';
import { TitleLarge, TitleForm } from '../base/Text';
import { LabelInput, TextArea } from '../base/Input';
import Tag from '../base/Tag';
import { TextButton } from '../base/Button';

const Position = ({ position }) => (
  <React.Fragment>
    <Col lg={6}>
      <LabelInput label="Position" name="position" text="Backend Developer" disabled />
    </Col>
    <Col lg={3}>
      <LabelInput label="Salary Range (Bath)" name="salary" text="15000 - 20000" disabled />
    </Col>
    <Col lg={3}>
      <LabelInput label="Capacity" name="capacity" text="Capacity of recruitment." disabled />
    </Col>
    <Col>
      <Label className="mb-0" for="description">Description (optional)</Label>
      <TextArea style={{ margin: '6px 0' }} disabled value="Tell more about the position." />
    </Col>
    <Col>
      <Label className="mb-0" for="documents">Required Documents</Label>
      <div style={{ margin: '6px 0' }}>
        {
          ['Resume', 'Transcript'].map(tag => (
            <Tag key={tag}>
              {tag}
            </Tag>
          ))
        }
      </div>
      <hr />
    </Col>
  </React.Fragment>
);

const RecruiterJoinMatchPage = ({
  positions,
  addRecruiterPosition = () => { },
}) => (
  <WithJoinMatch>
    <Col>
      <TitleLarge className="my-2">Junior Programmer Match</TitleLarge>
    </Col>

    <TitleForm title="Profile" />
    <Col lg={6}>
      <LabelInput label="Company name" name="companyName" text="Facebook Thailand, Inc" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Location" name="location" text="Phayathai, BKK" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Email" name="email" text="jirapas.jil@gmail.com" disabled />
    </Col>
    <Col lg={6}>
      <LabelInput label="Phone Number" name="phoneNumber" text="0912121212" disabled />
    </Col>

    <TitleForm title="Positions" />
    {
      positions.map(position => <Position position={position} />)
    }

    <Col className="text-center">
      <TextButton onClick={() => addRecruiterPosition()}>+ Add more position</TextButton>
    </Col>
  </WithJoinMatch>
);

const mapStateToProps = state => ({
  positions: state.join.recruiter.positions,
});

const mapDispatchToProps = dispatch => ({
  addRecruiterPosition: bindActionCreators(addRecruiterPositionAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterJoinMatchPage);
