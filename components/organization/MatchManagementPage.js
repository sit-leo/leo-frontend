import React, { useState } from 'react';
import moment from 'moment';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { message } from 'antd';

import Organization from '../layouts/organization';

import { clientInstance } from '../../tools/request';

import matchAdapter from '../../store/match/match-adapter';

import {
  setMatchValueByAttribute as setMatchValueByAttributeAction,
  setMatch as setMatchAction,
} from '../../store/match';

import { Col } from '../base/Grid';
import Form, { FormContainer } from '../base/Form';
import { TitleMedium, SubTitleWhite, TitleForm } from '../base/Text';
import { SmallMainButton } from '../base/Button';
import {
  LabelInput, TextArea, DateRangePicker, DatePicker,
} from '../base/Input';
import Modal from '../base/Modal';

import CoverImage from './CoverImage';

export function isCreateOrUpdate(haveCurrentMatch) {
  return !haveCurrentMatch ? 'Create Match' : 'Update Match';
}

const MatchManagementPage = ({
  isCurrentMatch = false,
  match: {
    id,
    name,
    description,
    startJoiningDate,
    endJoiningDate,
    applicantRankingEndDate,
    recruiterRankingEndDate,
    announceDate,
  },
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    getFieldValue,
    validateFieldsAndScroll,
  },
  setMatchValue = () => { },
  setMatch = () => { },
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const matchRequest = matchAdapter(clientInstance());

  function createMatch(match) {
    return matchRequest.createMatch(match).then(data => setMatch(data) && message.success('Create match success.'));
  }

  function updateMatch(match) {
    return matchRequest.updateMatch(match).then(data => setMatch(data) && message.success('Update match success.'));
  }

  function submitForm() {
    const values = getFieldsValue();
    const [startDate, endDate] = values.joinPeriod;
    const match = {
      name: values.name,
      description: values.description,
      startJoiningDate: startDate,
      endJoiningDate: endDate,
      applicantRankingEndDate: values.applicantRankingEndDate,
      recruiterRankingEndDate: values.recruiterRankingEndDate,
      announceDate: values.announceDate,
    };
    if (isCurrentMatch) {
      updateMatch({ ...match, id });
    } else {
      createMatch(match);
    }
  }

  return (
    <Organization title={isCreateOrUpdate(isCurrentMatch)} url="/organizations/matches/create">
      <FormContainer
        onSubmit={(e) => {
          e.preventDefault();
          validateFieldsAndScroll((err) => {
            if (!err) {
              setIsOpenModal(true);
            }
          });
        }}
      >
        <Col className="text-center">
          <hr />
          <CoverImage />
          <TitleMedium className="my-2 text-center">
            <b>Cover Photo</b>
          </TitleMedium>
        </Col>

        <TitleForm title="Match detail" />
        <Col>
          <LabelInput
            label="Match name"
            name="name"
            text={name}
            onChange={e => setMatchValue('name', e.target.value)}
            getFieldDecorator={getFieldDecorator}
          />
        </Col>
        <Col>
          <Label for="description" className="mb-0">Description</Label>
          {
            getFieldDecorator('description', {
              initialValue: description,
              rules: [
                {
                  required: true,
                  message: 'Please fill "Description".',
                },
              ],
            })(
              <TextArea onChange={e => setMatchValue('description', e.target.value)} />,
            )
          }
        </Col>
        <TitleForm title="Date detail" />
        <Col lg={6} className="my-2">
          <DateRangePicker
            label="Join Period"
            name="joinPeriod"
            getFieldDecorator={getFieldDecorator}
            value={{ startJoiningDate, endJoiningDate }}
            onChange={(joinPeriod) => {
              const [startDate, endDate] = joinPeriod;
              setMatchValue('startJoiningDate', startDate);
              setMatchValue('endJoiningDate', endDate);
              setFieldsValue({ joinPeriod });
            }}
          />
        </Col>
        <Col lg={6} className="my-2">
          <DatePicker
            label="Applicant Ranking End Date"
            name="applicantRankingEndDate"
            value={applicantRankingEndDate}
            onChange={(date) => {
              setMatchValue('applicantRankingEndDate', date.format());
              setFieldsValue({ applicantRankingEndDate: date });
            }}
            getFieldDecorator={getFieldDecorator}
            validator={(rule, value, callback) => {
              const [_, endJoinDate] = getFieldValue('joinPeriod');
              const endDate = moment(endJoinDate).add(1, 'days');
              if (value && endDate && (value.isBefore(endDate) || value.isSame(endDate))) {
                callback('"Applicant Ranking End Date" must after "Join Period" at least 1 day.');
              }
              callback();
            }}
          />
        </Col>
        <Col lg={6} className="my-2">
          <DatePicker
            label="Recruiter Ranking End Date"
            name="recruiterRankingEndDate"
            value={recruiterRankingEndDate}
            onChange={(date) => {
              setMatchValue('recruiterRankingEndDate', date.format());
              setFieldsValue({ recruiterRankingEndDate: date });
            }}
            getFieldDecorator={getFieldDecorator}
            validator={(rule, value, callback) => {
              const endDate = getFieldValue('applicantRankingEndDate');
              if (value && endDate && (value.isBefore(endDate) || value.isSame(endDate))) {
                callback('"Recruiter Ranking End Date" must after "Applicant Ranking End Date".');
              }
              callback();
            }}
          />
        </Col>
        <Col lg={6} className="my-2">
          <DatePicker
            label="Announce Date"
            name="announceDate"
            value={announceDate}
            onChange={(date) => {
              setMatchValue('announceDate', date.format());
              setFieldsValue({ announceDate: date });
            }}
            getFieldDecorator={getFieldDecorator}
            validator={(rule, value, callback) => {
              const endDate = getFieldValue('recruiterRankingEndDate');
              if (value && endDate && (value.isBefore(endDate) || value.isSame(endDate))) {
                callback('"Announce Date Date" must after "Recruiter Ranking End Date".');
              }
              callback();
            }}
          />
        </Col>

        <Col className="text-center">
          <hr />
          <SmallMainButton htmlType="submit" className="mt-3 mb-5">
            <SubTitleWhite className="mb-0">
              {isCreateOrUpdate(isCurrentMatch)}
            </SubTitleWhite>
          </SmallMainButton>
        </Col>
      </FormContainer>
      <Modal
        isOpenModal={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={() => {
          setIsOpenModal(false);
          submitForm();
        }}
        options={{
          header: 'Match Management Confirmation',
          body: `Are you sure to confirm this ${isCurrentMatch ? 'changed' : 'information'}?
          Please check the information before confirming.`,
          footer: 'You can\'t edit your if the match joined by participant.',
        }}
      />
    </Organization>
  );
};

const mapStateToProps = state => ({
  isCurrentMatch: state.match.isCurrentMatch,
  match: state.match.match,
});

const mapDispatchToProps = dispatch => ({
  setMatch: bindActionCreators(setMatchAction, dispatch),
  setMatchValue: bindActionCreators(setMatchValueByAttributeAction, dispatch),
});

const WrappedMatchManagementPage = Form.create({ name: 'match_management_page' })(MatchManagementPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedMatchManagementPage);
