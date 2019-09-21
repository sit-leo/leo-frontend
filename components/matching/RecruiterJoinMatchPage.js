import React from 'react';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';

import {
  addRecruiterPosition as addRecruiterPositionAction,
  updateRecruiterPosition as updateRecruiterPositionAction,
} from '../../store/matching/join';

import WithJoinMatch from '../layouts/join-match';

import { Col } from '../base/Grid';
import { TitleLarge, TitleForm } from '../base/Text';
import { LabelInput, TextArea } from '../base/Input';
import Tag from '../base/Tag';
import { TextButton } from '../base/Button';

const Position = ({
  dataKey,
  position,
  updateRecruiterPosition = () => { },
}) => (
  <React.Fragment>
    <Col lg={6}>
      <LabelInput
        label="Position"
        name="name"
        placeholder="Backend Developer"
        onChange={e => updateRecruiterPosition(dataKey, e.target.name, e.target.value)}
        text={position.name}
      />
    </Col>
    <Col lg={3}>
      <LabelInput
        label="Salary Range (Bath)"
        name="salary"
        placeholder="15000 - 20000"
        onChange={e => updateRecruiterPosition(dataKey, e.target.name, e.target.value)}
        text={position.salary}
      />
    </Col>
    <Col lg={3}>
      <LabelInput
        label="Capacity"
        name="capacity"
        placeholder="Capacity of recruitment."
        type="number"
        onChange={e => updateRecruiterPosition(dataKey, e.target.name, e.target.value)}
        text={position.capacity}
      />
    </Col>
    <Col>
      <Label className="mb-0" for="description">Description (optional)</Label>
      <TextArea
        style={{ margin: '6px 0' }}
        name="description"
        placeholder="Tell more about the position."
        onChange={e => updateRecruiterPosition(dataKey, e.target.name, e.target.value)}
        text={position.description}
      />
    </Col>
    <Col>
      <Label className="mb-0" for="documents">Required Documents</Label>
      <div style={{ margin: '6px 0' }}>
        {
          position.documents.map(tag => (
            <Tag key={`${dataKey}-${tag}`}>
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
  updateRecruiterPosition = () => { },
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
      positions.map((position, index) => {
        const dataKey = `${index}`;
        return (
          <Position
            key={dataKey}
            dataKey={dataKey}
            position={position}
            updateRecruiterPosition={updateRecruiterPosition}
          />
        );
      })
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
  updateRecruiterPosition: bindActionCreators(updateRecruiterPositionAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecruiterJoinMatchPage);
