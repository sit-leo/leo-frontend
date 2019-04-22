import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addRecruiterRank, removeRecruiterRank, setIsUpdateRank } from '../../store/matching/ranking';

import RankingCard from './RankingCard';
import ActionButton from './ActionButton';

function isApplicantInRecruiterRanks(recruiterRanks, applicantMatchId) {
  return recruiterRanks.findIndex(rank => rank.applicantMatchId === applicantMatchId) !== -1;
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
        applicants.map((applicantMatch => (
          <RankingCard
            key={applicantMatch.applicant.id}
            title={applicantMatch.applicant.name}
            value={applicantMatch.applicant.educations[0].gpax}
            subtitle={applicantMatch.applicant.educations[0].educationName}
            capacity={0}
            badgeText="Documents"
            actionButton={(
              <ActionButton
                isInRank={!isApplicantInRecruiterRanks(recruiterRanks, applicantMatch.applicantMatchId)}
                addRank={() => setIsUpdate(true) && addRank(applicantMatch)}
                removeRank={() => setIsUpdate(true) && removeRank(applicantMatch)}
              />
)}
          />
        )))
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
