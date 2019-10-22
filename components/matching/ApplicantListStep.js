import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getApplicantInformations } from '../../tools/ranking-informations';

import { addRecruiterRank, removeRecruiterRank, setIsUpdateRank } from '../../store/matching/ranking';

import RankingCard from './RankingCard';
import ActionButton from './ActionButton';

function isApplicantInRecruiterRanks(recruiterRanks, participantId) {
  return recruiterRanks.findIndex(rank => rank.participantId === participantId) !== -1;
}

const ApplicantList = ({
  applicants,
  recruiterRanks = [],
  addRank = () => {},
  removeRank = () => {},
  setIsUpdate = () => {},
}) => (
  <React.Fragment>
    {
        applicants.map(((applicantMatch) => {
          const { applicant: { id, name, educations } } = applicantMatch;
          const [{ gpax, major, university }] = educations;
          return (
            <RankingCard
              key={id}
              title={name}
              value={`GPAX ${gpax}`}
              subtitle={`${major}, ${university}`}
              capacity={0}
              informations={getApplicantInformations(applicantMatch)}
              actionButton={(
                <ActionButton
                  isInRank={!isApplicantInRecruiterRanks(recruiterRanks, applicantMatch.participantId)}
                  addRank={() => setIsUpdate(true) && addRank(applicantMatch)}
                  removeRank={() => setIsUpdate(true) && removeRank(applicantMatch)}
                />
              )}
            />
          );
        }))
    }
  </React.Fragment>
);

const mapStateToProps = state => ({
  applicants: state.ranking.applicants,
  recruiterRanks: state.ranking.recruiterRanks,
});

const mapDispatchToPositionProps = dispatch => ({
  addRank: bindActionCreators(addRecruiterRank, dispatch),
  removeRank: bindActionCreators(removeRecruiterRank, dispatch),
  setIsUpdate: bindActionCreators(setIsUpdateRank, dispatch),
});

export default connect(mapStateToProps, mapDispatchToPositionProps)(ApplicantList);
