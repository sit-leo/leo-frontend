import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Select } from 'antd';

import { getApplicantInformations, getPositionInformations } from '../../tools/ranking-informations';
import { isApplicant } from '../../tools/with-roles';

import { setIsUpdateRank } from '../../store/matching/ranking';

import Form from '../base/Form';
import Button from '../base/Button';
import { TextError } from '../base/Text';
import { Col } from '../base/Grid';
import { FlexCenter } from '../base/Flex';
import Icon, { DeletedIcon } from '../base/Icon';
import { TooltipError } from '../base/Tooltip';

import RankingCard from './RankingCard';

const RankingButton = ({
  ranks, rank, ranking, form, checkSequence,
}) => {
  const id = `ranking-${
    rank.position ? rank.position.id : rank.applicantMatch.applicantId
  }`;
  const error = form.getFieldError(id);
  return (
    <Form.Item className="w-75 mb-0">
      {
        form.getFieldDecorator(id, {
          initialValue: rank.sequence || '-',
          rules: [{ validator: checkSequence }],
        })(
          <TooltipError visible={error !== undefined} placement="bottom" title="Please rank">
            <Select
              className="text-center"
              onChange={ranking(rank)}
            >
              <Select.Option value="-">
                  -
              </Select.Option>
              {
                  ranks.map((_, key) => (
                    <Select.Option disabled={ranks.findIndex(({ sequence }) => sequence === key + 1) !== -1} key={key + 1} value={key + 1}>
                      {key + 1}
                    </Select.Option>
                  ))
                }
            </Select>
          </TooltipError>,
        )
      }
    </Form.Item>
  );
};

const ConfirmedButton = () => (
  <Button className="w-100">
    <Icon type="check" />
    Confirmed
  </Button>
);

const RankingErrorText = () => (
  <FlexCenter>
    <TextError className="my-3">
      Please select at least 1 in previous step.
    </TextError>
  </FlexCenter>
);

const RankingStep = ({
  role,
  isConfirm,
  haveRank,
  isUpdateRank,
  setIsUpdate = () => { },

  isOpenConfirm,
  toggleConfirm = () => { },

  ranks,
  updateRank = () => { },
  removeRank = () => { },

  form,
}) => {
  const rankCounter = ranks.length;

  function ranking(rank) {
    return sequence => setIsUpdate(true) && updateRank(sequence, rank);
  }

  function remove(rank) {
    setIsUpdate(true);
    return removeRank(rank);
  }

  function getRankedNestedValue(ranked) {
    if (ranked.educations && Array.isArray(ranked.educations)) {
      return ranked.educations[0];
    }
    return ranked.recruiter;
  }

  function getApplicantDocuments(ranked) {
    return (ranked.documents && Array.isArray(ranked.documents) && ranked.documents.length);
  }

  function checkSequence(rule, value, callback) {
    if (value === '-') {
      callback('');
      return;
    }
    callback();
  }

  return (
    <Form>
      {
        (rankCounter > 0)
          ? ranks.map((rank) => {
            const ranked = (rank.applicantMatch && rank.applicantMatch.applicant) || rank.position;
            const nestedValue = getRankedNestedValue(ranked);
            const subtitle = (
              nestedValue.major
              && nestedValue.university
              && `${nestedValue.major}, ${nestedValue.university}`
            ) || `${nestedValue.name}, ${nestedValue.location}`;
            const value = (nestedValue.gpax && `GPAX ${nestedValue.gpax}`) || ranked.money;
            const capacity = getApplicantDocuments(ranked) || ranked.capacity;
            const informations = isApplicant(role) ? getPositionInformations(rank.position) : getApplicantInformations(rank.applicantMatch);
            return (
              <RankingCard
                key={ranked.id}
                title={ranked.name}
                value={value}
                subtitle={subtitle}
                capacity={capacity}
                informations={informations}
                rankingButton={(
                  <RankingButton
                    rank={rank}
                    ranks={ranks}
                    ranking={ranking}
                    checkSequence={checkSequence}
                    form={form}
                  />
                )}
                actionButton={(
                  <DeletedIcon type="delete" theme="filled" onClick={() => remove(rank)} />
                )}
              />
            );
          })
          : <RankingErrorText />
      }
      <Col lg={{ size: 4, offset: 4 }}>
        {
          isConfirm ? (<ConfirmedButton />)
            : (
              <Button
                className="w-100"
                disabled={rankCounter === 0 || !isUpdateRank}
                onClick={() => {
                  form.validateFieldsAndScroll((err) => {
                    if (!err) {
                      toggleConfirm(!isOpenConfirm);
                    }
                  });
                }}
              >
                {
                  !(haveRank && isUpdateRank)
                    ? 'Confirm Ranking'
                    : 'Update Ranking'
                }
              </Button>
            )
        }
      </Col>
    </Form>
  );
};

const WrappedRankingStep = Form.create({ name: 'ranking' })(RankingStep);

const mapStateToProps = state => ({
  role: state.user.role,
  isConfirm: state.ranking.isConfirm,
  haveRank: state.ranking.haveRank,
  isUpdateRank: state.ranking.isUpdateRank,
});

const mapDispatchToProps = dispatch => ({
  setIsUpdate: bindActionCreators(setIsUpdateRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRankingStep);
