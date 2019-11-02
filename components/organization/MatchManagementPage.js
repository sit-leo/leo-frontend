import React from 'react';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Organization from '../layouts/organization';

import { setMatchValueByAttribute as setMatchValueByAttributeAction } from '../../store/match';

import { Col } from '../base/Grid';
import Form, { FormContainer } from '../base/Form';
import { TitleMedium, SubTitleWhite, TitleForm } from '../base/Text';
import { SmallMainButton } from '../base/Button';
import {
  LabelInput, TextArea, DateRangePicker, DatePicker,
} from '../base/Input';

import CoverImage from './CoverImage';

function isCreateOrUpdate(haveCurrentMatch) {
  return !haveCurrentMatch ? 'Create Match' : 'Update Match';
}

const MatchManagementPage = ({
  isCurrentMatch = false,
  match: {
    name,
    description,
    startJoiningDate,
    endJoiningDate,
    applicantRankingEndDate,
    recruiterRankingEndDate,
    announceDate,
  },
  form: { getFieldDecorator, setFieldsValue, validateFields },
  setMatchValue = () => { },
}) => (
  <Organization title={isCreateOrUpdate(isCurrentMatch)}>
    <FormContainer
      onSubmit={(e) => {
        e.preventDefault();
        validateFields((err, values) => {
          console.log(values);
          if (!err) {
            // createMatch();
            // updateMatch();
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
  </Organization>
);

const mapStateToProps = state => ({
  match: state.match.match,
});

const mapDispatchToProps = dispatch => ({
  setMatchValue: bindActionCreators(setMatchValueByAttributeAction, dispatch),
});

const WrappedMatchManagementPage = Form.create({ name: 'match_management_page' })(MatchManagementPage);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedMatchManagementPage);
