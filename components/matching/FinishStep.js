import React from 'react';
import { connect } from 'react-redux';

import RankingCard from './RankingCard';
import Finished from './Finished';

const FinishStep = ({
  recruiterRanks = [],
}) => (
  <React.Fragment>
    <Finished />
    {
      recruiterRanks.map(({ applicantMatch, sequence }) => (
        <RankingCard
          sequence={sequence}
          key={applicantMatch.applicant.id}
          title={applicantMatch.applicant.name}
          value={applicantMatch.applicant.educations[0].gpax}
          subtitle={applicantMatch.applicant.educations[0].educationName}
          actionButton={null}
        />
      ))
    }
  </React.Fragment>
);


const mapStateToProps = state => ({
  recruiterRanks: state.ranking.recruiterRanks,
});

export default connect(mapStateToProps)(FinishStep);
