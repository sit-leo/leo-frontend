import React from 'react';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clientInstance } from '../../tools/request';
import matchingAdapter from '../../store/matching/matching-adapter';

import {
  addRecruiterPosition as addRecruiterPositionAction,
  updateRecruiterPosition as updateRecruiterPositionAction,
  setInputDocumentVisible as setInputDocumentVisibleAction,
  setDocument as setDocumentAction,
  addRecruiterDocument as addRecruiterDocumentAction,
  removeRecruiterDocument as removeRecruiterDocumentAction,
} from '../../store/matching/join';

import WithJoinMatch from '../layouts/join-match';

import { Col } from '../base/Grid';
import { TitleLarge, TitleForm } from '../base/Text';
import Input, { LabelInput, TextArea } from '../base/Input';
import Tag from '../base/Tag';
import { TextButton } from '../base/Button';
import Icon from '../base/Icon';
import Form, { FormContainer } from '../base/Form';

const handleConfirmRecruiter = async (id, positions) => {
  const matchRequest = matchingAdapter(clientInstance());
  await matchRequest.joinMatchRecruiter(id, positions);
};

const Position = ({
  dataKey,
  position,
  updateRecruiterPosition = () => { },
  inputDocumentVisible,
  setInputDocumentVisible,
  document,
  setDocument,
  addRecruiterDocument = () => { },
  removeRecruiterDocument = () => { },
  getFieldDecorator,
}) => (
  <React.Fragment>
    <Col lg={6}>
      <LabelInput
        label="Position"
        attribute="name"
        name={`position-name-${dataKey}`}
        placeholder="Backend Developer"
        onChange={e => updateRecruiterPosition(dataKey, e.target.getAttribute('attribute'), e.target.value)}
        text={position.name}
        getFieldDecorator={getFieldDecorator}
      />
    </Col>
    <Col lg={3}>
      <LabelInput
        label="Salary Range (Bath)"
        attribute="salary"
        name={`salary-${dataKey}`}
        placeholder="15000 - 20000"
        onChange={e => updateRecruiterPosition(dataKey, e.target.getAttribute('attribute'), e.target.value)}
        text={position.salary}
        getFieldDecorator={getFieldDecorator}
      />
    </Col>
    <Col lg={3}>
      <LabelInput
        label="Capacity"
        attribute="capacity"
        name={`capacity-${dataKey}`}
        placeholder="Capacity of recruitment."
        type="number"
        onChange={e => updateRecruiterPosition(dataKey, e.target.getAttribute('attribute'), e.target.value)}
        text={position.capacity}
        getFieldDecorator={getFieldDecorator}
      />
    </Col>
    <Col>
      <Label className="mb-0" for="description">Description (optional)</Label>
      <TextArea
        style={{ margin: '6px 0' }}
        attribute="description"
        name={`description-${dataKey}`}
        placeholder="Tell more about the position."
        onChange={e => updateRecruiterPosition(dataKey, e.target.getAttribute('attribute'), e.target.value)}
        text={position.description}
      />
    </Col>
    <Col>
      <Label className="mb-0" for="documents">Required Documents</Label>
      <div style={{ margin: '6px 0' }}>
        {
          position.documents.map(tag => (
            <Tag
              closable
              key={`${dataKey}-${tag}`}
              onClose={(e) => {
                e.preventDefault();
                removeRecruiterDocument(dataKey, tag);
              }}
            >
              {tag}
            </Tag>
          ))
        }
        {
          inputDocumentVisible && (
            <Input
              type="text"
              size="small"
              style={{ width: 78 }}
              value={document}
              onChange={e => setDocument(e.target.value)}
              onBlur={() => setInputDocumentVisible(false)}
              onPressEnter={() => {
                if (document !== '') {
                  addRecruiterDocument(dataKey, document);
                  setDocument('');
                }
              }}
            />
          )
        }

        {
          !inputDocumentVisible && (
            <Tag onClick={() => setInputDocumentVisible(true)}>
              <Icon type="plus" />
              Add Skill
            </Tag>
          )
        }
      </div>
      <hr />
    </Col>
  </React.Fragment>
);

const RecruiterJoinMatchPage = ({
  match,
  positions,
  addRecruiterPosition = () => { },
  updateRecruiterPosition = () => { },
  inputDocumentVisible,
  setInputDocumentVisible,
  document,
  setDocument,
  addRecruiterDocument = () => { },
  removeRecruiterDocument = () => { },
  form: { getFieldDecorator },
}) => (
  <WithJoinMatch
    handleConfirm={() => handleConfirmRecruiter(match.id, { positions })}
  >
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
    <FormContainer>
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
              inputDocumentVisible={inputDocumentVisible}
              setInputDocumentVisible={setInputDocumentVisible}
              document={document}
              setDocument={setDocument}
              addRecruiterDocument={addRecruiterDocument}
              removeRecruiterDocument={removeRecruiterDocument}
              getFieldDecorator={getFieldDecorator}
            />
          );
        })
      }
    </FormContainer>

    <Col className="text-center">
      <TextButton onClick={() => addRecruiterPosition()}>+ Add more position</TextButton>
    </Col>
  </WithJoinMatch>
);

const mapStateToProps = state => ({
  match: state.match.match,
  positions: state.join.recruiter.positions,
  inputDocumentVisible: state.join.inputDocumentVisible,
  document: state.join.document,
});

const mapDispatchToProps = dispatch => ({
  addRecruiterPosition: bindActionCreators(addRecruiterPositionAction, dispatch),
  updateRecruiterPosition: bindActionCreators(updateRecruiterPositionAction, dispatch),
  setInputDocumentVisible: bindActionCreators(setInputDocumentVisibleAction, dispatch),
  setDocument: bindActionCreators(setDocumentAction, dispatch),
  addRecruiterDocument: bindActionCreators(addRecruiterDocumentAction, dispatch),
  removeRecruiterDocument: bindActionCreators(removeRecruiterDocumentAction, dispatch),
});

const WrappedRecruiterJoinMatchPage = Form.create({ name: 'login_page' })(RecruiterJoinMatchPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRecruiterJoinMatchPage);
